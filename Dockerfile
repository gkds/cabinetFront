### STAGE 1:BUILD ###
# Defining a node image to be used as giving it an alias of "build"
# Which version of Node image to use depends on project dependencies 
# This is needed to build and compile our code 
# while generating the docker image
ARG WORK_DIR=/build

FROM node:14.17 as builder

ARG WORK_DIR
ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY package-lock.json ${WORK_DIR}

RUN npm install @angular/cli
RUN npm install

COPY . ${WORK_DIR}

RUN ng build 
#--configuration=production


### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest AS ngi
ARG WORK_DIR
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder 
COPY --from=builder ${WORK_DIR}/dist/cabinetFront /usr/share/nginx/html
COPY ./nginx-dev.conf  /etc/nginx/conf.d/default.conf
#COPY /server-cert.crt /etc/nginx
#COPY /server-cert.key /etc/nginx
# Exposing a port, here it means that inside the container 
# the app will be using Port 80 while running
EXPOSE 80

CMD nginx -g "daemon off;"