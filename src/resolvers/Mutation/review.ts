import getUserId from '../../utils/getUserId';

export const review = {
  async createReview(
		parent: any,
		args: { data: { author: string; post: string } },
		{ prisma, request }: any,
		info: any
	) {
		const { post } = args.data;
		const userId = getUserId(request);
		const userExists = await prisma.exists.User({ id: userId });
		if (!userExists) {
			throw new Error("User not found");
		}
		const isPublished = await prisma.exists.Post({ id: post, published: true });
		if (!isPublished) {
			throw new Error("Post not found");
		}

		const Review = await prisma.mutation
			.createReview(
				{
					data: {
						...args.data,
						author: {
							connect: {
								id: userId
							}
						},
						post: {
							connect: {
								id: post
							}
						}
					}
				},
				info
			)
			.catch((e: void) => console.error(e));

		return Review;
	},
	async updateReview(
		parent: any,
		args: { id: string; data: { text: string } },
		{ prisma, request }: any,
		info: any
	) {
		const { id, data } = args;
		const userId = getUserId(request);

		const ReviewExists = await prisma.exists.Review({
			id,
			author: {
				id: userId
			}
		});

		if (!ReviewExists) {
			throw new Error("Review not found");
		}

		const Review = await prisma.mutation
			.updateReview(
				{
					data,
					where: {
						id
					}
				},
				info
			)
			.catch((e: void) => console.error(e));

		return Review;
	},
	async deleteReview(
		parent: any,
		args: { id: string },
		{ prisma, request }: any,
		info: any
	) {
		const { id } = args;
		const userId = getUserId(request);

		const ReviewExists = await prisma.exists.Review({
			id,
			author: {
				id: userId
			}
		});

		if (!ReviewExists) {
			throw new Error("Review not found");
		}

		const Review = await prisma.mutation
			.deleteReview(
				{
					where: {
						id
					}
				},
				info
			)
			.catch((e: void) => {
				console.error(e);
			});

		return Review;
	}
}