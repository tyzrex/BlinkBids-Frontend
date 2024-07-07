
FROM node:20-alpine as builder 

WORKDIR /app

COPY package.json .
COPY yarn.lock .
# RUN npm install -g yarn

EXPOSE 3000

RUN yarn 
COPY . .
RUN yarn build
CMD ["yarn", "start"]