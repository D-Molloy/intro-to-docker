FROM node:12-stretch


# containers are run on the root level by default (bad idea) so update the user
# the creators of the node container added a 'node' user for this purpose
USER node

# to prevent the files from being copied to root
# You pick where it goes
WORKDIR /home/node/code

# copy from source to destination
# copied with root privelages by default, and since we have a new user (above) they would have access.
# COPY index.js index.js
COPY --chown=node:node index.js index.js

# ADD command has additional functionality (like network access or automaticaly unzipping a file).
# ADD --chown=node:node index.js index.js

CMD ["node", "index.js"]

# build container
# docker build -t my-node-app .

# run container
#  docker run my-node-app