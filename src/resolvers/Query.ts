import prisma from "../prisma";
import { Context } from "graphql-yoga/dist/types";
import getUserId from "../utils/getUserId";

const Query = {
	async users(
		parent: any,
		args: {
			query: any;
			first: number;
			skip: number;
			after: string;
			orderBy: string;
		},
		{ prisma }: Context,
		info: any
	) {
		const { query, first, skip, after, orderBy } = args;

		const opArgs = {
			where: {},
			first,
			skip,
			after,
			orderBy
		};

		if (query) {
			opArgs.where = {
				OR: [
					{
						name_contains: query
					}
				]
			};
		}
		const users = await prisma.query.users(opArgs, info);

		return users;
	},
	async listings(
		parent: any,
		args: {
			query: any;
			first: number;
			skip: number;
			after: string;
			orderBy: string;
		},
		{ prisma }: Context,
		info: any
	) {
		const { query, first, skip, after, orderBy } = args;

		const opArgs: any = {
			where: {
				published: true
			},
			first,
			skip,
			after,
			orderBy
		};
		if (query) {
			opArgs.where.OR = [
				{
					name_contains: query
				},
				{
					Description_contains: query
				}
			];
		}
		const listings = await prisma.query.listings(opArgs, info);

		return listings;
	},
	async reviews(
		parent: any,
		args: {
			first: number;
			skip: number;
			after: string;
			orderBy: string;
		},
		{ prisma }: Context,
		info: any
	) {
		const { first, skip, after, orderBy } = args;

		const opArgs: any = {
			first,
			skip,
			after,
			orderBy
		};

		return prisma.query.reviews(opArgs, info);
	},
	async mybookings(
		parent: any,
		args: {
			first: number;
			skip: number;
			after: string;
			orderBy: string;
		},
		{ prisma, request }: Context,
		info: any
	) {
		const { first, skip, after, orderBy } = args;
		const userId = getUserId(request, true);

		const opArgs: any = {
			where: {
				author: {
					id: userId
				}
			},
			first,
			skip,
			after,
			orderBy
		};
		const bookings = await prisma.query.bookings(opArgs, info);

		return bookings;
	},
	async mylistings(
		parent: any,
		args: {
			first: number;
			skip: number;
			after: string;
			orderBy: string;
		},
		{ prisma, request }: Context,
		info: any
	) {
		const { first, skip, after, orderBy } = args;
		const userId = getUserId(request, true);

		const opArgs: any = {
			where: {
				author: {
					id: userId
				}
			},
			first,
			skip,
			after,
			orderBy
		};

		const listings = await prisma.query.listings(opArgs, info);
		return listings;
	},
	async listing(
		parent: any,
		args: {
			id: string;
		},
		{ prisma }: Context,
		info: any
	) {
		const { id } = args;
		const opArgs: any = {
			where: {
				id
			}
		};
		const listing = await prisma.query.listing(opArgs, info);
		return listing;
	}
};

export default Query;
