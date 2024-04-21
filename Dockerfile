FROM node:20-alpine3.19
WORKDIR /app
RUN mkdir .temp
COPY package*.json /app/
RUN npm install
COPY . /app/
CMD [ "npm", "start" ]