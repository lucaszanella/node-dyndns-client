FROM node:latest
MAINTAINER Lucas Zanella (me@lucaszanella.com)

WORKDIR /home

#ARG URL=""
#ARG HOSTNAME=""
#ARG USERNAME=""
#ARG PASSWORD=""
#ARG PROTOCOL=""
#ARG INTERFACE=""
#ARG CHECK=""

#RUN touch config.txt \
#    && echo url=$URL >> config.txt \
#    && echo hostname=$HOSTNAME >> config.txt \
#    && echo username=$USERNAME >> config.txt \
#    && echo password=$PASSWORD >> config.txt \
#    && echo protocol=$PROTOCOL >> config.txt \
#    && echo interface=$INTERFACE >> config.txt \
#    && echo check=$CHECK >> config.txt \
#&& cat config.txt

RUN touch config.txt

COPY lib /home/lib
COPY client.js /home/client.js 
COPY package.json /home/package.json
COPY index.js /home/index.js 


ENTRYPOINT ["node", "/home/client.js"]
