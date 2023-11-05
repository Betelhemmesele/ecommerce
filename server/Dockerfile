FROM node:16.20.2-alpine3.18
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]