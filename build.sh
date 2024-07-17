#!/bin/bash
npm run build
docker build --build-arg STAGE=$1 -t $2 .
