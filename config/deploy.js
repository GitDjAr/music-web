// 执行以下命令
// del dist/nodeAutoDeploy.zip && 7z a dist/nodeAutoDeploy.zip  ./ && curl http://www.xn--lg3a.top:82/update/file -F file=@dist/nodeAutoDeploy.zip -F path=/usr/local/nginx/html/nodeAutoDeploy
// 参数说明
// file: 文件
// path: 项目路径
// restart: 是否重启

/**
 * docker container run \
  --rm \
  --name mynginx \
  --volume "/myServe/music-web/music":/usr/share/nginx/html \
  --volume "/myServe/nginx":/etc/nginx \
  -p 0.0.0.0:9527:80 \
  -d \
  nginx
 */
