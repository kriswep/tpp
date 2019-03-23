# v1.1
# see: https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker
FROM node:10-alpine

# Create dirs
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy package.json and lockfile
COPY package*.json ./

USER node

# install deps
RUN npm install

# Copy all other files
COPY --chown=node:node . .

EXPOSE 3210

CMD [ "node", "./src/index.js" ]

# Howto:
# sudo docker build -t andteam/tpp-broker .
# sudo docker images
# sudo docker run --name tpp-broker -p 3210:3210 -d andteam/tpp-broker
# sudo docker logs tpp-broker
