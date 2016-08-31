FROM node:latest

# Create app directory
RUN mkdir -p /code/honeycomb-template
WORKDIR /code/honeycomb-template

# Install app dependencies
COPY package.json /code/honeycomb-template/

RUN npm install

# Bundle app source
COPY . /code/honeycomb-template

# build assets
RUN npm run build:production

# access-port
EXPOSE 3000

# start-command
CMD [ "npm", "start:production" ]
