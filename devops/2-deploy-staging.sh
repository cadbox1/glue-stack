#!/bin/bash

set -e

gcloud config set project glue-stack-251212
gcloud config set compute/zone australia-southeast1-a

# create staging cluster. will fail if it already exists but that's ok.
gcloud container clusters create staging-cluster --cluster-version=1.13.7-gke.24 --num-nodes=1 --machine-type=g1-small || true

gcloud container clusters get-credentials staging-cluster

gcloud compute addresses create staging-ip-address --global || true

gcloud components install kubectl

kubectl apply -f ./deployment/common/
kubectl apply -f ./deployment/staging/