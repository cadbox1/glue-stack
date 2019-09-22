FROM node:10.16.1-alpine as dependencies
WORKDIR /app
COPY ui/package.json ui/yarn.lock ./
RUN yarn

FROM dependencies as compiled
COPY ui ./
RUN yarn build

FROM nginx:1.17.2-alpine
COPY devops/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=compiled /app/build/ /usr/share/nginx/html