FROM node:10.16.1-alpine as ui-build-stage
WORKDIR /app
COPY ui/package.json ui/yarn.lock ./
RUN yarn
COPY ui ./
RUN yarn build

FROM nginx:1.17.2-alpine
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=ui-build-stage /app/build/ /usr/share/nginx/html