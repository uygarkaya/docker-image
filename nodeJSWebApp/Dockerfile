# Specify the base image
FROM node:14-alpine

# Working directory to work in the selected path
WORKDIR /usr/app

# Download & install a properties/dependency
# Minimize the cache busting for re-builds
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Tell the image what to do when it starts as a container
CMD ["npm", "start"]