FROM oven/bun:alpine

WORKDIR /usr/src/app/server

COPY package*.json ./
COPY bun.lockb ./

RUN bun install --frozen-lockfile

COPY ./src /usr/src/app/server/src

EXPOSE 3000

CMD [ "bun" , "run" , "dev"]