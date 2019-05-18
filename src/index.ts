import { GraphQLServer, PubSub } from "graphql-yoga";
import helmet from "helmet";
import cors from 'cors';
import rateLimit from "express-rate-limit";
import prisma from "./prisma";
import { resolvers } from "./resolvers/index";

const pubsub = new PubSub();

const server: GraphQLServer = new GraphQLServer({
	typeDefs: "./src/schema/schema.graphql",
	resolvers,
	context(request) {
		return {
			prisma,
			request
		};
	}
});
const limiter = new rateLimit({
	windowMs: 60 * 1000,
	max: 250
});

server.express.use(cors())
server.express.use(helmet());
// only if you're behind a reverse proxy
// (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
server.express.enable("trust proxy");

server.express.use(limiter);

server.start(() => {
	console.log("Started");
});
