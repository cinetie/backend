FROM public.ecr.aws/lts/ubuntu:20.04_stable
LABEL Author="Alain Christian(gal1l0)"

# install our dependencies and install nodejs
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install nodejs
RUN apt install -y redis-server
RUN service redis-server start

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package*.json /tmp/
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
ADD . /opt/app

EXPOSE 3001

CMD ["sh","start.sh"]