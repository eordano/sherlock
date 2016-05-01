FROM ubuntu:latest

MAINTAINER Esteban Ordano <eordano@gmail.com>

# Download and install nodejs and npm
RUN apt-get update
RUN apt-get -y dist-upgrade
RUN apt-get install -y npm

# Shared volume
RUN mkdir -p /var/sherlock
VOLUME ["/var/sherlock"]

WORKDIR "/var/sherlock"

# Default command for container, start supervisor
RUN npm install
CMD ["npm", "start"]

# Expose port 3000 of the container
EXPOSE 3000
