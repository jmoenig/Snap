FROM node:lts-alpine
WORKDIR /usr/src/browser
COPY . .
WORKDIR /usr/src/browser/utils
RUN npm ci
WORKDIR /usr/src/browser/
CMD ["node", "utils/serve.js"]
