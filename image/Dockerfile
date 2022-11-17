FROM node:latest

WORKDIR /usr/src/app

# have nodemon available for local dev use (file watching)
RUN npm install -g nodemon

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3006

CMD ["node", "src/index.js"]