# Start out with a base container
FROM node:12-stretch

# Tell it what to do when it starts up (in an array)
# -e === immediately execute the next command  (-e is a node command)
CMD ["node", "-e", "console.log('HELLO FROM DOCKER')"]

# To run:
# CREATE CONTAINER - docker build [path_to_file]
# docker build . (look for the Dockerfile in this directory and run it)
# RUN CONTAINER with default name-docker run [container_name]
# docker run 84bdb0181972
# TAG (name) CONTAINER -  docker build --tag [new_app_name] [path_to_container]
#  docker build --tag my-node-app .
# docker run my-node-app
# TO ADD A VERSION NUMBER
# docker build --tag my-node-app:1 .