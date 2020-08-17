# making a smaller build by using alpine,which then installs node (Instead of specifying node and full ubuntu installation)
# FROM alpine:3.10

#  creating a multi-stage build.  We'll build in this container
# create another container
# and throw the original container away

## BUILD STAGE
FROM node:12-stretch AS build
WORKDIR /build
COPY package-lock.json package.json ./
RUN npm ci
COPY . .



## RUNTIME STAGE
FROM alpine:3.10

# apk - alpine package manage  **LEAVING OFF NPM because its not needed for production
RUN apk add --update nodejs-current

# CREATE THE USER - the node groups add the user 'node' and add 'node' to the "node" group
RUN addgroup -S node && adduser -S node -G node

USER node

RUN mkdir /home/node/code
WORKDIR /home/node/code

# not needed because we took care of it in the build stage
# COPY --chown=node:node package-lock.json package.json ./
# RUN npm ci
# COPY --chown=node:node . .
# copy the files from the build folder in /home/node/code
COPY --from=build --chown=node:node /build .

CMD ["node", "index.js"]