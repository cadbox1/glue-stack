#!/bin/bash

# Usage

# Local
# PATH_TO_KEY=/path/to/key.json sh ./4-delete-staging-cluster.sh

# CI
# Environment variables: SERVICE_ACCOUNT_KEY
# sh ./4-delete-staging-cluster.sh

set -e

# if we don't have a PATH_TO_KEY then take create one from SERVICE_ACCOUNT_KEY.
if [ -z ${PATH_TO_KEY+x} ]; 
	then 
		PATH_TO_KEY=key.json;
		echo "$SERVICE_ACCOUNT_KEY" > $PATH_TO_KEY
fi

gcloud auth activate-service-account --key-file=$PATH_TO_KEY

gcloud container clusters delete staging-cluster --quiet