FROM node:16-alpine3.16

RUN mkdir -p /home/node/api/node_modules

WORKDIR /home/node/api

COPY package.json yarn.* ./

RUN yarn

COPY . .

RUN yarn prebuild

RUN yarn build