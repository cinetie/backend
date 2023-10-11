#!/bin/bash
export NODE_ENV=$1
./tools/split_env.py
# service redis-server start;
npm run start