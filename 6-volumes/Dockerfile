FROM node:12-alpine
COPY --chown=node:node . /src
WORKDIR /src
CMD ["node", "index.js"]

#Initial build
# docker build --tag=incrementor .
# trying to run this build multiple times always results in:
# # file not found, writing '0' to a new file
# because there is nothing persistent about the build.  It needs a volume
# # process.env.DATA_PATH is referenced in index.js - used to mount in the container


# docker run --env DATA_PATH=/data/num.txt --mount type=volume, src=incrementor