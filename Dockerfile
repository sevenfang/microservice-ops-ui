FROM 172.16.199.203/nginx:1.12

COPY nginx/ops.conf /etc/nginx/conf.d/default.conf

COPY dist /opt/nginx/dist
