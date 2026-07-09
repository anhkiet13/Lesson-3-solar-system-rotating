# Stage 1: Build source code bằng Node.js
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Build ra thư mục static 'dist'
RUN npx parcel build ./src/index.html --dist-dir dist --no-cache

# Stage 2: Dùng Nginx siêu nhẹ để phục vụ Web
FROM nginx:alpine
# Copy toàn bộ file đã build vào thư mục chứa web của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]