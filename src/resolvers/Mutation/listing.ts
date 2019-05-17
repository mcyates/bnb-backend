import getUserId from "../../utils/getUserId";
import { uploadImage } from "../../cloudinary";

export const listing = {
	async createListing(
		parent: any,
		args: { data: any },
		{ prisma, request }: any,
		info: any
	) {
		const userId = getUserId(request);

		const { author, published, hero } = args.data;

		const userExists = await prisma.exists.User({ id: userId });

		if (!userExists) {
			throw new Error("User not found");
		}

		if (hero) {
			args.data.heroUrl = await uploadImage(hero);
			args.data.hero = null;
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
			data: any;
		},
		{ prisma, request }: any,
		info: any
	) {
		const { id, data } = args;
		const { hero } = args.data;
		const userId = getUserId(request);

		if (hero) {
			args.data.heroUrl = await uploadImage(hero);
			args.data.hero = null;
		}

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
	}
};
