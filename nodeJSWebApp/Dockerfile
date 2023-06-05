# Specify the base image
FROM node:14-alpine

# Download & install a properties/dependency
COPY ./ ./
RUN npm install

# Tell the image what to do when it starts as a container
CMD ["npm", "start"]