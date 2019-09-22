#!/bin/bash

set -ex

gcloud auth configure-docker --quiet

REPO="asia.gcr.io/glue-stack-251212"
APP_IMAGE_TAG="$REPO/app-compiled"
APP_IMAGE_TAG="$REPO/app"

docker pull $APP_IMAGE_TAG:api-compile || true

docker build --cache-from $APP_IMAGE_TAG:api-compile --target api-compile -t $APP_IMAGE_TAG:api-compile ../
docker push $APP_IMAGE_TAG:api-compile

# https://stackoverflow.com/questions/55845723/volume-bind-mounting-from-docker-in-docker
if [ -z ${GITHUB_WORKSPACE+x} ]
	then PROJECT_ROOT="$PWD/.."
	else PROJECT_ROOT="/home/runner/work/glue-stack/glue-stack"
fi

docker run --rm -v $PROJECT_ROOT/api:/api -w /api -v /var/run/docker.sock:/var/run/docker.sock $APP_IMAGE_TAG:api-compile mvn test

docker build --cache-from $APP_IMAGE_TAG:api-compile -t $APP_IMAGE_TAG:latest ../
docker push $APP_IMAGE_TAG:latest