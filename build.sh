#!/bin/bash
npm run build
docker build --build-arg STAGE=$1 -t cinetie/main-api:$2 .
