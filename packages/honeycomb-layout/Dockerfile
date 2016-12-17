FROM node:latest

# Install Yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:$PATH

# Create app directory
RUN mkdir -p /code/honeycomb-layout
WORKDIR /code/honeycomb-layout

# Set environment variable
ENV NODE_ENV production

# Install app dependencies
COPY package.json /code/honeycomb-layout
RUN yarn --pure-lockfile

# Bundle app source
COPY . /code/honeycomb-layout

# Build
RUN yarn run build

# Port
EXPOSE 3000

# Start
CMD [ "npm", "start" ]
