#!/bin/bash

set -ex

gcloud auth configure-docker --quiet

APP_IMAGE_TAG="asia.gcr.io/glue-stack-251212/app"

docker pull $APP_IMAGE_TAG:api-compile || true

docker build --cache-from $APP_IMAGE_TAG:api-compile --target api-compile -t $APP_IMAGE_TAG:api-compile ../
docker push $APP_IMAGE_TAG:api-compile

docker run --rm -v $PWD/../api/:$PWD -w $PWD -v /var/run/docker.sock:/var/run/docker.sock $APP_IMAGE_TAG:api-compile mvn test

docker build --cache-from $APP_IMAGE_TAG:api-compile -t $APP_IMAGE_TAG:latest ../
docker push $APP_IMAGE_TAG:latest