FROM node:12 as builder
ARG NODE_ENV=staging
ENV NODE_ENV=${NODE_ENV}}
RUN apk --no-cache add python make g++
LABEL Author="Alain Christian(gal1l0)"

# install our dependencies and install nodejs


# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package*.json ./
RUN npm install

FROM node:12
WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules
COPY . .

EXPOSE 3001

CMD ["npm", "run", "start-staging"]