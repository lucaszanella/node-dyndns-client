FROM node:latest
MAINTAINER Lucas Zanella (me@lucaszanella.com)

WORKDIR /home

ARG HOSTNAME=""
ARG USERNAME=""
ARG PASSWORD=""
ARG PROTOCOL=""
ARG INTERFACE=""
ARG CHECK=""

RUN touch config.txt \
    && echo hostname=$HOSTNAME >> config.txt \
    && echo username=$USERNAME >> config.txt \
    && echo password=$PASSWORD >> config.txt \
    && echo protocol=$PROTOCOL >> config.txt \
    && echo interface=$INTERFACE >> config.txt \
    && echo check=$CHECK >> config.txt \
&& cat config.txt

COPY lib /home/lib
COPY client.js /home/client.js 

ENTRYPOINT ["node", "client.js"]
