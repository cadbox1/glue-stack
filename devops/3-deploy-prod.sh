#!/bin/bash

# Usage

# Local
# PATH_TO_KEY=/path/to/key.json sh ./3-deploy-prod.sh

# CI
# Environment variables: SERVICE_ACCOUNT_KEY
# sh ./3-deploy-prod.sh

set -e

# if we don't have a PATH_TO_KEY then take create one from SERVICE_ACCOUNT_KEY.
if [ -z ${PATH_TO_KEY+x} ]; 
	then 
		PATH_TO_KEY=key.json;
		echo "$SERVICE_ACCOUNT_KEY" > $PATH_TO_KEY
fi

gcloud auth activate-service-account --key-file=$PATH_TO_KEY

gcloud config set project glue-stack-251212
gcloud config set compute/zone australia-southeast1-a

# create prod cluster. will fail if it already exists but that's ok.
gcloud container clusters create prod-cluster --cluster-version=1.13.7-gke.24 --num-nodes=1 --machine-type=g1-small || true

gcloud container clusters get-credentials prod-cluster

gcloud compute addresses create prod-ip-address --global || true

kubectl apply -f ./deployment/common/
kubectl apply -f ./deployment/prod/