FROM node:alpine

RUN npm install -g npm@7.19.1
RUN npm install -g typescript nodemon

WORKDIR /data
COPY . .

CMD ["yarn", "start"]
