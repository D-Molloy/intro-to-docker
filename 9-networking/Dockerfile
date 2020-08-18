FROM node:12-stretch

USER node

# need to create the dir with node user.  Relying on WORKDIR sets user to root
RUN mkdir /home/node/code

WORKDIR /home/node/code

# The line below prevents the node_modules from being installed everytime you build (unless you've added new packages)
# but caching the file could prevent security patches from being applied
COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node . .

# RUN - run any arbitrary shell commands that you need to
# best practice, use 'npm ci' to adhere to whatever is in the package-lock.json (also faster than regular install)
# need to install npm inside the container
RUN npm ci

# EXPOSE - could you expose instead of being explicit on the command line (--publish)
# docker run --init --rm --publish 3000:3000 my-node-app
# ===
# docker run --init --rm -p 3000:3000 my-node-app ls -lsah
# EXPOSE 3000
#but Brian says its better to be explicit so that you can choose the port.  Can be useful to include in dockerfile so that others know what to publish it on
CMD ["node", "index.js"]