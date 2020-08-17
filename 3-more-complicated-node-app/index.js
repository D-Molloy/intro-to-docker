// more-or-less the example code from the hapi-pino repo
const hapi = require("@hapi/hapi");

async function start() {
    const server = hapi.server({
        // can't use localhost!  0.0.0.0 allows the network to exit the container
        host: "0.0.0.0",
        port: process.env.PORT || 3000
    });

    server.route({
        method: "GET",
        path: "/",
        handler() {
            return { success: true };
        }
    });

    await server.register({
        // hapi pino is a logging plugin
        plugin: require("hapi-pino"),
        options: {
            prettyPrint: true
        }
    });

    await server.start();

    return server;
}

start().catch(err => {
    console.log(err);
    process.exit(1);
});