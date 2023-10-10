#!bin/bash
if [ "$ENVIRONMENT" == "production" ]; then
  ENV_FILE=".env.production"
elif [ "$ENVIRONMENT" == "staging" ]; then
  ENV_FILE=".env.staging"
else
  ENV_FILE=".env"
fi

source "$ENV_FILE"

service redis-server start;
npm run start