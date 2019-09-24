#!/bin/bash

set -ex

gcloud auth configure-docker --quiet

REPO="asia.gcr.io/glue-stack-251212"
API_DEPENDENCIES_IMAGE_NAME="$REPO/api-dependencies"
API_IMAGE_NAME="$REPO/api"

if [ -z ${GITHUB_SHA+x} ]
	then TAG="local"
	else TAG=$GITHUB_SHA
fi

docker pull $API_DEPENDENCIES_IMAGE_NAME:latest || true

docker build -t $API_DEPENDENCIES_IMAGE_NAME:$TAG -t $API_DEPENDENCIES_IMAGE_NAME:latest --target dependencies --cache-from $API_DEPENDENCIES_IMAGE_NAME:latest ../
docker push $API_DEPENDENCIES_IMAGE_NAME:$TAG
docker push $API_DEPENDENCIES_IMAGE_NAME:latest

# https://stackoverflow.com/questions/55845723/volume-bind-mounting-from-docker-in-docker
if [ -z ${GITHUB_WORKSPACE+x} ]
	then PROJECT_ROOT="$PWD/../.."
	else PROJECT_ROOT="/home/runner/work/glue-stack/glue-stack"
fi

docker run --rm -v $PROJECT_ROOT/api:/api -w /api -v /var/run/docker.sock:/var/run/docker.sock $API_DEPENDENCIES_IMAGE_NAME:latest mvn test

docker build -t $API_IMAGE_NAME:$TAG -t $API_IMAGE_NAME:latest --cache-from $API_DEPENDENCIES_IMAGE_NAME:latest ../
docker push $API_IMAGE_NAME:$TAG
docker push $API_IMAGE_NAME:latest