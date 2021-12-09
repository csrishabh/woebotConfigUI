FROM node:16-alpine3.13 as build

WORKDIR /usr/local/app

COPY . /usr/local/app/

RUN npm i

RUN npm run build

CMD ["npm","run","start"]