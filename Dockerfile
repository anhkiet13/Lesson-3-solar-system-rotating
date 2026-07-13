# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit
COPY . .
RUN npx parcel build ./src/index.html --dist-dir dist --no-cache

# Stage 2: Nginx Runner
FROM nginx:alpine

# Copy file cấu hình Nginx tối ưu vào container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy sản phẩm đã build ra thư mục chứa web
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]