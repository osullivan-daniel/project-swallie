FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx nx build frontend-admin --configuration=production


FROM nginx:alpine

COPY --from=build /app/dist/frontend-admin/browser /usr/share/nginx/html
COPY frontend-admin/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80