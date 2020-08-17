# react app was created with
# npx --ignore-existing create-react-app static-assets-project --template typescript --use-npm

FROM node:latest
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# you could totally use nginx:alpine here too
FROM nginx:latest
COPY --from=0 /app/build /usr/share/nginx/html
# NOT using a CMD command because we don't want to overide nginxs default behavior


# # build/run
# docker build -t static-app .
# nginx runs on 80 by default and we can access the app via 8080
# docker run -p 8080:80 static-app

#BIND MOUNT -  files on your computer that you're exposing to the container
# serve the specified folder in a container so you can work on it
# useful for developer environments
# docker run --mount type=bind,source="$(pwd)"/build,target=/usr/share/nginx/html -p 8080:80 nginx

#VOLUME - the container holds onto the files and gives them to you when you request