FROM node:14.19.1

WORKDIR /client

COPY ./package*.json ./

RUN npm install

RUN npm install -g http-server

COPY . .

RUN npm run build && cp dist/index.html dist/404.html

EXPOSE 8080:8080

VOLUME src

CMD ["http-server", "dist"]
