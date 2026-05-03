@echo off
chcp 65001 >nul

echo ========================================
echo   Vector Lab Studio - 工具集
echo ========================================
echo.
echo  请选择要运行的工具:
echo.
echo  [1] VitePress 本地开发服务器
echo  [2] B站UP主投稿视频获取工具
echo.
set /p choice="请输入选项 (1 或 2): "

if "%choice%"=="1" (
    goto run_vitepress
) else if "%choice%"=="2" (
    goto run_bilibili
) else (
    echo [ERROR] 无效的选项，请输入 1 或 2。
    pause
    exit /b 1
)

:run_vitepress
:: 检查 node_modules 是否存在（判断依赖是否已安装）
if not exist "node_modules" (
    echo [INFO] 检测到依赖未安装，正在安装依赖...
    echo.
    call npm install
    if errorlevel 1 (
        echo [ERROR] 依赖安装失败，请检查网络或 npm 配置。
        pause
        exit /b 1
    )
    echo.
    echo [INFO] 依赖安装完成！
    echo.
)

:: 检查 vitepress 是否可用
call npx vitepress --version >nul 2>&1
if errorlevel 1 (
    echo [INFO] 未检测到 VitePress，正在安装...
    echo.
    call npm install vitepress
    if errorlevel 1 (
        echo [ERROR] VitePress 安装失败，请检查网络或 npm 配置。
        pause
        exit /b 1
    )
    echo.
    echo [INFO] VitePress 安装完成！
    echo.
)

echo [INFO] 正在启动 VitePress 开发服务器...
echo.
call npm run docs:dev
goto end

:run_bilibili
echo.
echo ========================================
echo   B站UP主投稿视频获取工具
echo ========================================
echo.
echo  默认UID: 94657270
echo.
set /p uid="请输入UID (直接回车使用默认值): "
if "%uid%"=="" set uid=94657270

set /p keywords="请输入搜索关键词 (可选，直接回车跳过): "

set /p orderby="请选择排序方式 (pubdate=最新发布, views=最多播放, 直接回车默认最新发布): "
if "%orderby%"=="" set orderby=pubdate

echo.
echo [INFO] 正在获取数据，请稍候...
echo.
node scripts/fetch_bilibili_archives.js %uid% %keywords% %orderby%

if errorlevel 1 (
    echo.
    echo [ERROR] 获取失败，请检查网络连接或UID是否正确。
) else (
    echo.
    echo [INFO] 获取完成！结果已保存到 docs/bilibili_archives.json
)

goto end

:end
echo.
pause
