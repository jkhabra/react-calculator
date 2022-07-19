FROM node:12-alpine

WORKDIR /app

ENV HOST=0.0.0.0
ENV NODE_ENV=development
ENV PORT=3000
EXPOSE 3000

COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm i

COPY . /app

CMD npm run start