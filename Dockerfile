# Stage 1: Build mã nguồn
FROM node:20-alpine AS builder
WORKDIR /app

# Copy file package trước để tận dụng Docker Cache
COPY package*.json ./
RUN npm install --ignore-scripts

# Copy toàn bộ source code (Đã loại trừ node_modules nhờ .dockerignore)
COPY . .

# Build ra file tĩnh với flag --no-cache
RUN npx parcel build ./src/index.html --dist-dir dist --no-cache

# Stage 2: Phục vụ Web bằng Nginx Alpine siêu nhẹ
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]