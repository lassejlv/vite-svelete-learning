FROM node:latest as runtime


WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE $PORT


CMD [ "npm", "start" ]