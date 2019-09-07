#!/bin/bash

# Usage

# Local
# PATH_TO_KEY=/path/to/key.json sh ./1-build.sh

# CI
# Environment variables: SERVICE_ACCOUNT_KEY
# sh ./1-build.sh

set -e

# if we don't have a PATH_TO_KEY then take create one from SERVICE_ACCOUNT_KEY.
if [ -z ${PATH_TO_KEY+x} ]; 
	then 
		PATH_TO_KEY=key.json;
		echo "$SERVICE_ACCOUNT_KEY" > $PATH_TO_KEY
fi

APP_IMAGE_TAG="asia.gcr.io/glue-stack-251212/app"

gcloud auth activate-service-account --key-file=$PATH_TO_KEY

docker pull $APP_IMAGE_TAG:api-compile || true

docker build --cache-from $APP_IMAGE_TAG:api-compile --target api-compile -t $APP_IMAGE_TAG:api-compile ../
docker push $APP_IMAGE_TAG:api-compile

docker run -it --rm -v $PWD/../api/:$PWD -w $PWD -v /var/run/docker.sock:/var/run/docker.sock $APP_IMAGE_TAG:api-compile mvn test

docker build --cache-from $APP_IMAGE_TAG:api-compile -t $APP_IMAGE_TAG:latest ../
docker push $APP_IMAGE_TAG:latest