FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN npm run build

CMD ["node", "dist/main.js"]