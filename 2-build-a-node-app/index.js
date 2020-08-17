// https://btholt.github.io/complete-intro-to-containers/build-a-nodejs-app

const http = require("http");


http
    .createServer(function (request, response) {
        console.log("request received");
        response.end("omg hi", "utf-8");
    })
    .listen(3000);
console.log("server started");


// to run this with the ability to ^C:
// docker run --init my-node-app


// this container doesn't have access to the network, so to give it access
// --rm - remove the container when it closes
// --publish 3000:3000 == allow the app running in the container on port 3000 be available on 3000
// note that the process still runs and can receive requests after the container is exited

// docker run --init --rm --publish 3000:3000 my-node-app