FROM node:latest

# Install PM2
RUN npm install pm2 -g

# Create app directory
RUN mkdir -p /code/honeycomb-layout
WORKDIR /code/honeycomb-layout

# Install app dependencies
COPY package.json /code/honeycomb-layout
RUN npm install

# Bundle app source
COPY . /code/honeycomb-layout

# Build
RUN npm run build

# Port
EXPOSE 3000

# Start
CMD [ "pm2-docker", ".config/pm2.production.json" ]
