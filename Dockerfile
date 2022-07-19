FROM nikolaik/python-nodejs:python3.9-nodejs14

WORKDIR /home/app

RUN mkdir versions

COPY ui .

RUN npm i

COPY main.sh .

ENV DANGEROUSLY_DISABLE_HOST_CHECK=true

ENTRYPOINT ["/bin/bash","main.sh"]
