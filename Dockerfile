FROM node:latest
MAINTAINER Lucas Zanella (me@lucaszanella.com)

WORKDIR /home

ENTRYPOINT ["node", "client.js"]
