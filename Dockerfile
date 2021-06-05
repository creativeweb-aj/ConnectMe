FROM node:14.17.0-alpine AS node
WORKDIR /connectme
COPY package.json /connectme
RUN npm install -g @angular/cli@11.2.12 && npm install
COPY . /connectme