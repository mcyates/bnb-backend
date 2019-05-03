import getUserId from '../../utils/getUserId';

export const listing = {
  async createListing(
		parent: any,
		args: { data: { author: string; published: boolean } },
		{ prisma, request }: any,
		info: any
	) {
		const userId = getUserId(request);

		const { author, published } = args.data;
		const userExists = await prisma.exists.User({ id: author });

		if (!userExists) {
			throw new Error("User not found");
		}

		const Listing = await prisma.mutation
			.createListing(
				{
					data: {
						...args.data,
						author: {
							connect: {
								id: userId
							}
						}
					}
				},
				info
			)
			.catch((e: void) => console.error(e));

		return Listing;
	},
	async updateListing(
		parent: any,
		args: {
			id: string;
			data: { title: string; body: string; published: boolean };
		},
		{ prisma, request }: any,
		info: any
	) {
		const { id, data } = args;
		const userId = getUserId(request);

		const ListingExists = await prisma.exists.Listing({
			id,
			author: {
				id: userId
			}
		});

		if (!ListingExists) {
			throw new Error("Listing not found");
		}

		const isPublished = await prisma.exists.Listing({ id, published: true });

		if (isPublished && data.published === false) {
			await prisma.mutation.deleteManyComments({ where: { Listing: { id } } });
		}

		const Listing = await prisma.mutation
			.updateListing(
				{
					data,
					where: {
						id
					}
				},
				info
			)
			.catch((e: void) => console.error(e));

		return Listing;
	},
	async deleteListing(
		parent: any,
		args: { id: any },
		{ prisma, request }: any,
		info: any
	) {
		const userId = getUserId(request);
		const { id } = args;

		const ListingExists = await prisma.exists.Listing({
			id,
			author: {
				id: userId
			}
		});

		if (!ListingExists) {
			throw new Error("Listing not found");
		}

		const Listing = await prisma.mutation
			.deleteListing(
				{
					where: {
						id
					}
				},
				info
			)
			.catch((e: void) => console.error(e));

		return Listing;
	},
}