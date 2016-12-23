FROM node:alpine

# Install Yarn
RUN apk add --no-cache --virtual .build-deps tar curl bash gnupg \
  && curl -o- -L https://yarnpkg.com/install.sh | bash \
  && apk del .build-deps
ENV PATH /root/.yarn/bin:$PATH

# Create app directory
RUN mkdir -p /code/honeycomb-layout
WORKDIR /code/honeycomb-layout

# Install app dependencies
COPY package.json /code/honeycomb-layout/
RUN apk add --no-cache --virtual .app-deps python make g++ \
  && yarn --pure-lockfile --production \
  && yarn cache clean \
  && apk del .app-deps

# Bundle app source
COPY . /code/honeycomb-layout

# Set environment variable
ENV NODE_ENV production

# Port
EXPOSE 3000

# Start
CMD [ "yarn", "start" ]
