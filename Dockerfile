FROM node:12-alpine as builder

ARG NODE_ENV=staging
ENV NODE_ENV=${NODE_ENV}

RUN apk --no-cache add python make g++

COPY package*.json ./

RUN npm install

# Building the actual app after building dependecies

FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules

COPY . .

RUN npm run build

COPY . .

EXPOSE 3001:3001

CMD ["npm", "run", "start"]
