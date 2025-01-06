FROM hub.lumigame.com/base/nginx:brotli-1.20.2-zlib

COPY ./src/.nginx/game.conf /etc/nginx/conf.d/default.conf
COPY ./src/build/web-mobile/ /usr/share/nginx/html
COPY ./src/splash-screen/splash-resources  /usr/share/nginx/html/splash-resources
COPY ./src/splash-screen/images  /usr/share/nginx/html/images
COPY ./src/remote /usr/share/nginx/html/remote