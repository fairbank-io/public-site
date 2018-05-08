FROM nginx:1.14.0
COPY build /usr/share/nginx/html
COPY conf.nginx /etc/nginx/nginx.conf