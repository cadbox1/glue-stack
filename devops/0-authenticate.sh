#!/bin/bash

# Usage
# PATH_TO_KEY=/path/to/key.json sh ./0-authenticate.sh

gcloud auth activate-service-account --key-file=$PATH_TO_KEY