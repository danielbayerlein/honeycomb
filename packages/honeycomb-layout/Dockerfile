FROM node:latest

# Create app directory
RUN mkdir -p /code/honeycomb-layout
WORKDIR /code/honeycomb-layout

# Install app dependencies
COPY package.json /code/honeycomb-layout

# set to production
ENV NODE_ENV=production

# install node_modules
RUN npm install

# Bundle app source
COPY . /code/honeycomb-layout

# build source
RUN npm run build

# access-port
EXPOSE 3000

# start-command
CMD [ "npm", "start" ]
