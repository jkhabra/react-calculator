# React Calculator

## Running locally

- install docker on your machine
- Run with docker compose for development

```bash
docker-compose up
docker-compose up -d // run in background
docker-compose stop // stop the server or Ctrl+C
docker-compose exec frontend bash // install npm package inside the docker images
```

- build docker container by cloning the repo and running

```bash
docker build -t login:test .
```

- run the docker container on local machine

```bash
docker run -p 3000:3000 login:test
```
