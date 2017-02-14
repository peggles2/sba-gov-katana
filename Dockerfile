FROM node:7.0.0

WORKDIR /tmp
COPY package.json /tmp/
COPY node_modules/react-slick /tmp/hax/react-slick
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
RUN mv /tmp/node_modules /usr/src/app/
COPY src/views /usr/src/app/views
COPY public /usr/src/app/public
COPY dist /usr/src/app/

EXPOSE 3000

CMD ["node", "app.js"]
