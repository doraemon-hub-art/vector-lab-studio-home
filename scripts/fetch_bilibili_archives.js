/**
 * B站UP主投稿视频获取脚本
 * 
 * 功能：获取指定UID的UP主所有投稿视频，按标题中的【xx】标签分类，
 *       并按发布时间从新到老排序，结果保存到根目录的JSON文件。
 *       如果标题中没有【xx】标签，则忽略该视频。
 * 
 * API: https://uapis.cn/api/v1/social/bilibili/archives
 * 
 * Reference: https://uapis.cn/docs/api-reference/get-social-bilibili-archives
 * 
 * 用法: node scripts/fetch_bilibili_archives.js [uid]
 *       默认UID: 94657270
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ============ 配置 ============
const DEFAULT_UID = '94657270';
const API_BASE_URL = 'uapis.cn';
const API_PATH = '/api/v1/social/bilibili/archives';
const PAGE_SIZE = 50; // 每页获取50条，减少请求次数
const OUTPUT_FILE = path.join(__dirname, '..', '', 'bilibili_archives.json');

/**
 * 发送HTTP GET请求
 */
function httpGet(url, path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: url,
            path: path,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
            },
            timeout: 30000,
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed);
                } catch (e) {
                    reject(new Error(`JSON解析失败: ${e.message}, 原始数据: ${data.substring(0, 200)}`));
                }
            });
        });

        req.on('error', (e) => {
            reject(new Error(`请求失败: ${e.message}`));
        });

        req.on('timeout', () => {
            req.destroy();
            reject(new Error('请求超时'));
        });

        req.end();
    });
}

/**
 * 获取一页视频数据
 */
async function fetchPage(uid, keywords, orderby, ps, pn) {
    let apiPath = `${API_PATH}?mid=${uid}&ps=${ps}&pn=${pn}&orderby=${orderby}`;
    if (keywords) {
        apiPath += `&keywords=${encodeURIComponent(keywords)}`;
    }

    console.log(`  [请求] 页码 ${pn}, 每页 ${ps} 条...`);
    const result = await httpGet(API_BASE_URL, apiPath);

    if (result.code && result.code !== 200 && result.code !== 'OK') {
        throw new Error(`API返回错误: ${result.message || JSON.stringify(result)}`);
    }

    return result;
}

/**
 * 获取UP主的所有投稿视频
 */
async function fetchAllArchives(uid, keywords = '', orderby = 'pubdate') {
    console.log(`\n========== 开始获取UP主投稿 ==========`);
    console.log(`  UID: ${uid}`);
    console.log(`  排序: ${orderby === 'pubdate' ? '最新发布' : '最多播放'}`);
    console.log(`  关键词: ${keywords || '无'}`);
    console.log(`========================================\n`);

    let allVideos = [];
    let total = 0;
    let page = 1;
    let maxPages = 100; // 安全限制，防止无限循环

    // 先获取第一页，了解总数
    const firstPage = await fetchPage(uid, keywords, orderby, PAGE_SIZE, 1);
    
    if (!firstPage.videos || !Array.isArray(firstPage.videos)) {
        console.error('API返回格式异常:', JSON.stringify(firstPage, null, 2));
        throw new Error('API返回格式异常，缺少videos字段');
    }

    total = firstPage.total || 0;
    console.log(`  总稿件数: ${total}\n`);

    allVideos = allVideos.concat(firstPage.videos);
    console.log(`  [成功] 第1页, 获取 ${firstPage.videos.length} 条, 累计 ${allVideos.length}/${total}\n`);

    // 计算总页数
    const totalPages = Math.ceil(total / PAGE_SIZE);
    console.log(`  总页数: ${totalPages}\n`);

    // 继续获取剩余页
    for (page = 2; page <= totalPages && page <= maxPages; page++) {
        const pageData = await fetchPage(uid, keywords, orderby, PAGE_SIZE, page);
        
        if (pageData.videos && Array.isArray(pageData.videos)) {
            allVideos = allVideos.concat(pageData.videos);
            console.log(`  [成功] 第${page}页, 获取 ${pageData.videos.length} 条, 累计 ${allVideos.length}/${total}`);
        } else {
            console.warn(`  [警告] 第${page}页返回数据异常，停止获取`);
            break;
        }

        // 添加延迟，避免请求过快
        if (page < totalPages) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    console.log(`\n========== 获取完成 ==========`);
    console.log(`  共获取 ${allVideos.length} 条视频`);
    console.log(`==============================\n`);

    return allVideos;
}

/**
 * 从标题中提取【xx】标签
 * 例如: "【捡垃圾】KeychronQ11" -> "捡垃圾"
 * 返回第一个匹配的标签，如果没有则返回 null
 */
function extractTag(title) {
    const match = title.match(/【([^】]+)】/);
    return match ? match[1] : null;
}

/**
 * 按标题中的【xx】标签分类
 * 如果标题中没有【xx】标签，则忽略该视频
 */
function classifyByTag(videos) {
    const classified = {};
    let ignoredCount = 0;

    for (const video of videos) {
        const tag = extractTag(video.title);
        
        // 如果没有【xx】标签，忽略
        if (!tag) {
            ignoredCount++;
            continue;
        }

        const categoryKey = `【${tag}】`;

        if (!classified[categoryKey]) {
            classified[categoryKey] = [];
        }

        classified[categoryKey].push({
            aid: video.aid,
            bvid: video.bvid,
            title: video.title,
            cover: video.cover,
            duration: video.duration,
            play_count: video.play_count,
            publish_time: video.publish_time,
            create_time: video.create_time,
            state: video.state,
            is_ugc_pay: video.is_ugc_pay,
            is_interactive: video.is_interactive,
        });
    }

    return { classified, ignoredCount };
}

/**
 * 按发布时间从新到老排序
 */
function sortByPublishTime(videos) {
    return videos.sort((a, b) => {
        const timeA = a.publish_time || a.create_time || 0;
        const timeB = b.publish_time || b.create_time || 0;
        return timeB - timeA; // 降序，最新的在前
    });
}

/**
 * 格式化时长（秒 -> 时:分:秒）
 */
function formatDuration(seconds) {
    if (!seconds) return '0:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
        return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * 格式化时间戳
 */
function formatTimestamp(ts) {
    if (!ts) return '未知';
    const date = new Date(ts * 1000);
    return date.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

/**
 * 生成统计信息
 */
function generateStats(classified, totalVideos, ignoredCount) {
    const stats = {
        total_videos: totalVideos,
        classified_count: Object.values(classified).reduce((sum, v) => sum + v.length, 0),
        ignored_count: ignoredCount,
        fetch_time: new Date().toISOString(),
        uid: process.argv[2] || DEFAULT_UID,
        categories: {},
    };

    for (const [category, videos] of Object.entries(classified)) {
        stats.categories[category] = {
            count: videos.length,
            total_play_count: videos.reduce((sum, v) => sum + (v.play_count || 0), 0),
            total_duration: videos.reduce((sum, v) => sum + (v.duration || 0), 0),
        };
    }

    return stats;
}

/**
 * 主函数
 */
async function main() {
    const uid = process.argv[2] || DEFAULT_UID;
    const keywords = process.argv[3] || '';
    const orderby = process.argv[4] || 'pubdate';

    console.log('========================================');
    console.log('  B站UP主投稿视频获取工具');
    console.log('========================================');
    console.log(`  UID: ${uid}`);
    console.log(`  关键词: ${keywords || '无'}`);
    console.log(`  排序: ${orderby}`);
    console.log('========================================\n');

    try {
        // 1. 获取所有视频
        const allVideos = await fetchAllArchives(uid, keywords, orderby);

        if (allVideos.length === 0) {
            console.log('未获取到任何视频数据。');
            return;
        }

        // 2. 按标题中的【xx】标签分类
        console.log('正在按标题【xx】标签分类...');
        const { classified, ignoredCount } = classifyByTag(allVideos);
        console.log(`  分类完成，共 ${Object.keys(classified).length} 个分类`);
        console.log(`  忽略 ${ignoredCount} 个无【xx】标签的视频\n`);

        // 3. 每个分类内按时间排序
        console.log('正在按发布时间排序...');
        for (const [category, videos] of Object.entries(classified)) {
            classified[category] = sortByPublishTime(videos);
        }
        console.log('  排序完成\n');

        // 4. 生成统计信息
        const stats = generateStats(classified, allVideos.length, ignoredCount);

        // 5. 构建最终结果
        const result = {
            stats: stats,
            data: classified,
        };

        // 6. 输出分类统计
        console.log('========== 分类统计 ==========');
        for (const [category, videos] of Object.entries(classified)) {
            const totalDuration = videos.reduce((sum, v) => sum + (v.duration || 0), 0);
            const totalPlays = videos.reduce((sum, v) => sum + (v.play_count || 0), 0);
            console.log(`  ${category}: ${videos.length} 个视频, 总播放 ${totalPlays}, 总时长 ${formatDuration(totalDuration)}`);
        }
        console.log('==============================\n');

        // 7. 保存到文件（根目录）
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf-8');
        console.log(`✅ 结果已保存到: ${OUTPUT_FILE}`);
        console.log(`   文件大小: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2)} KB\n`);

        // 8. 打印前几个视频预览
        console.log('========== 视频预览（各分类前3条） ==========');
        for (const [category, videos] of Object.entries(classified)) {
            console.log(`\n--- ${category} (共 ${videos.length} 条) ---`);
            const preview = videos.slice(0, 3);
            for (const v of preview) {
                const time = formatTimestamp(v.publish_time || v.create_time);
                const dur = formatDuration(v.duration);
                console.log(`  [${v.bvid}] ${v.title}`);
                console.log(`    时长: ${dur} | 播放: ${v.play_count} | 时间: ${time}`);
            }
        }
        console.log('\n============================================');

    } catch (error) {
        console.error('\n❌ 错误:', error.message);
        if (error.response) {
            console.error('响应状态:', error.response.status);
        }
        process.exit(1);
    }
}

// 运行主函数
main();
