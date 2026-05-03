#!/bin/bash

# ========================================
#   Vector Lab Studio - 工具集
# ========================================

# 函数定义

run_vitepress() {
    # 检查 node_modules 是否存在
    if [ ! -d "node_modules" ]; then
        echo "[INFO] 检测到依赖未安装，正在安装依赖..."
        echo ""
        npm install
        if [ $? -ne 0 ]; then
            echo "[ERROR] 依赖安装失败，请检查网络或 npm 配置。"
            exit 1
        fi
        echo ""
        echo "[INFO] 依赖安装完成！"
        echo ""
    fi

    # 检查 vitepress 是否可用
    if ! npx vitepress --version > /dev/null 2>&1; then
        echo "[INFO] 未检测到 VitePress，正在安装..."
        echo ""
        npm install vitepress
        if [ $? -ne 0 ]; then
            echo "[ERROR] VitePress 安装失败，请检查网络或 npm 配置。"
            exit 1
        fi
        echo ""
        echo "[INFO] VitePress 安装完成！"
        echo ""
    fi

    echo "[INFO] 正在启动 VitePress 开发服务器..."
    echo ""
    npm run docs:dev
}

run_bilibili() {
    echo ""
    echo "========================================"
    echo "  B站UP主投稿视频获取工具"
    echo "========================================"
    echo ""
    echo "  默认UID: 94657270"
    echo ""

    read -p "请输入UID (直接回车使用默认值): " uid
    if [ -z "$uid" ]; then
        uid="94657270"
    fi

    read -p "请输入搜索关键词 (可选，直接回车跳过): " keywords

    read -p "请选择排序方式 (pubdate=最新发布, views=最多播放, 直接回车默认最新发布): " orderby
    if [ -z "$orderby" ]; then
        orderby="pubdate"
    fi

    echo ""
    echo "[INFO] 正在获取数据，请稍候..."
    echo ""
    node scripts/fetch_bilibili_archives.js "$uid" "$keywords" "$orderby"

    if [ $? -ne 0 ]; then
        echo ""
        echo "[ERROR] 获取失败，请检查网络连接或UID是否正确。"
    else
        echo ""
        echo "[INFO] 获取完成！结果已保存到 docs/bilibili_archives.json"
    fi

    echo ""
    read -p "按回车键退出..."
}

# 主程序
echo ""
echo "========================================"
echo "  Vector Lab Studio - 工具集"
echo "========================================"
echo ""
echo " 请选择要运行的工具:"
echo ""
echo "  [1] VitePress 本地开发服务器"
echo "  [2] B站UP主投稿视频获取工具"
echo ""

read -p "请输入选项 (1 或 2): " choice

case $choice in
    1)
        run_vitepress
        ;;
    2)
        run_bilibili
        ;;
    *)
        echo "[ERROR] 无效的选项，请输入 1 或 2。"
        exit 1
        ;;
esac
