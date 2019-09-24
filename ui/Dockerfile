FROM node:10.16.1-alpine as dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

FROM dependencies as packaged
COPY ./ ./
RUN yarn build

FROM nginx:1.17.2-alpine
COPY devops/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=packaged /app/build/ /usr/share/nginx/html