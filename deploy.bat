@echo off
echo 开始部署Vue应用...

:: 停止并删除旧容器
docker-compose down

:: 构建新镜像并启动容器
docker-compose up --build

echo 部署完成！请检查容器状态以确认是否成功。
pause
