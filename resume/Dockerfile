FROM node:latest

WORKDIR /usr/src/app

# have nodemon available for local dev use (file watching)
RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005

CMD ["node", "src/index.js"]