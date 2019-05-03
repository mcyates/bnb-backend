import { GraphQLServer, PubSub } from "graphql-yoga";
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

server.start(() => {
	console.log("Started");
});
