#!/bin/bash

set -euxo pipefail

gcloud container clusters delete staging-cluster --quiet