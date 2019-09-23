#!/bin/bash

set -ex

gcloud auth configure-docker --quiet

REPO="asia.gcr.io/glue-stack-251212"
UI_DEPENDENCIES_IMAGE_NAME="$REPO/nginx-dependencies"
UI_IMAGE_NAME="$REPO/nginx"

if [ -z ${GITHUB_SHA+x} ]
	then TAG="local"
	else TAG=$GITHUB_SHA
fi

docker pull $UI_DEPENDENCIES_IMAGE_NAME:latest || true

docker build -t $UI_DEPENDENCIES_IMAGE_NAME:$TAG -t $UI_DEPENDENCIES_IMAGE_NAME:latest --target dependencies --cache-from $UI_DEPENDENCIES_IMAGE_NAME:latest ../
docker push $UI_DEPENDENCIES_IMAGE_NAME:$TAG
docker push $UI_DEPENDENCIES_IMAGE_NAME:latest

docker build -t $UI_IMAGE_NAME:$TAG -t $UI_IMAGE_NAME:latest --cache-from $UI_DEPENDENCIES_IMAGE_NAME:latest ../
docker push $UI_IMAGE_NAME:$TAG
docker push $UI_IMAGE_NAME:latest