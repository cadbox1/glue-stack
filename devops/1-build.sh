#!/bin/bash

set -ex

cd ../
PROJECT_ROOT=$PWD

cd $PROJECT_ROOT/api/devops
sh ./build.sh

cd $PROJECT_ROOT/ui/devops
sh ./build.sh