# Build Phase
# Development Base Image -> node
FROM node:16-alpine as builder
WORKDIR '/usr/app'
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# Run Phase
# Development Server (Hosting) Base Image -> nginx 
FROM nginx:latest
EXPOSE 80
COPY --from=builder /usr/app/build /usr/share/nginx/html