#!/bin/bash

set -e

gcloud config set project glue-stack-251212
gcloud config set compute/zone australia-southeast1-a

# create prod cluster. will fail if it already exists but that's ok.
gcloud container clusters create prod-cluster --cluster-version=1.13.7-gke.24 --num-nodes=1 --machine-type=g1-small || true

gcloud container clusters get-credentials prod-cluster

gcloud compute addresses create prod-ip-address --global || true

gcloud components install kubectl

if [ -z ${GITHUB_SHA+x} ]
	then TAG="local"
	else TAG=$GITHUB_SHA
fi

find ./deployment/common -type f -exec sed -i.bak 's/$TAG/'"$TAG"'/g' {} \;

kubectl apply -f ./deployment/common/
kubectl apply -f ./deployment/prod/