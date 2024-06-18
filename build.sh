#!/bin/bash
npm run build
docker build -t cinetie/main-api:$1 .
