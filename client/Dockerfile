# Stage 1

FROM node:latest as build-stage

WORKDIR /hkdigitals-resume-ui

COPY package*.json ./

COPY package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Stage 2

FROM nginx:1.22.0-alpine

COPY --from=build-stage /hkdigitals-resume-ui/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3002

CMD nginx -g 'daemon off;'