# Stage 1: Build mã nguồn bằng Node.js
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json để install cache
COPY package*.json ./
RUN npm install --ignore-scripts

# Copy toàn bộ source code
COPY . .

# Build ra file tĩnh tĩnh bằng Parcel (Có flag --no-cache để không bị đơ)
RUN npx parcel build ./src/index.html --dist-dir dist --no-cache

# Stage 2: Đóng gói vào Nginx Alpine siêu nhẹ (~20MB)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]