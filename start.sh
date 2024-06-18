#!/bin/bash
service redis-server start;

# create the correct environment file
export NODE_ENV=$1
python ./tools/split_env.py

# Check if an environment is provided
if [ -z $1 ]
then
echo "No environment provided"
exit 1
fi

# Check if the environment provided is valid
if [ $1 != 'test' ] && [ $1 != 'development' ] && [ $1 != 'production' ]
then
echo "Invalid environment provided"
exit 1
fi

# Run the migrations based on the environment provided



if [ $1 == 'test' ] 
then
npm run migate:test
fi

if [ $1 == 'production' ] 
then
npm run migrate:production
fi

if [ $1 == 'development' ] 
then
npm run migrate:development;
fi

npm run start
