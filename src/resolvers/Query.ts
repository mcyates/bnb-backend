import prisma from "../prisma";
import { Context } from "graphql-yoga/dist/types";

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
    const {  first, skip, after, orderBy } = args;
    
    const opArgs: any = {
			first,
			skip,
			after,
			orderBy
    };
    
		return prisma.query.reviews(opArgs, info);
	},
};

export default Query;
