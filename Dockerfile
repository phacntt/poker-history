FROM node:alpine as build
WORKDIR /usr/src/app/poker-history
COPY ./package*.json ./
RUN yarn
COPY . .
RUN yarn build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/poker-history

COPY ./package*.json ./

RUN yarn --only=production

COPY . .

COPY --from=build /usr/src/app/poker-history/dist ./dist

CMD node dist/index.js