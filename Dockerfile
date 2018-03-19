FROM nginx:1.13.8
COPY build /usr/share/nginx/html
COPY conf.nginx /etc/nginx/nginx.conf