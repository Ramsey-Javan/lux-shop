# Docker File for a simple web application
FROM nginx:alpine

# copy ngix configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy website files
COPY ./public/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80