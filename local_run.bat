@echo off
chcp 65001 >nul

echo ========================================
echo   Vector Lab Studio - 本地开发环境
echo ========================================
echo.

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

pause
