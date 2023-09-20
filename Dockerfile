FROM node:lts-alpine
WORKDIR /usr/src/browser
COPY . .
WORKDIR /usr/src/browser/src/cloud
RUN npm ci && npm run build
WORKDIR /usr/src/browser/utils
RUN npm ci
WORKDIR /usr/src/browser/
CMD ["node", "utils/serve.js"]
