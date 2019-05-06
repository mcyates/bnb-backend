import getUserId from "../../utils/getUserId";

export const booking = {
	// create booking
	async createBooking(
		parent: any,
		args: {
			data: any;
			listing: string;
		},
		{ prisma, request }: any,
		info: any
	) {
		const { data, listing } = args;
		const userId = getUserId(request, true);

		const userExists = await prisma.exists.User({ id: userId });

		if (!userId) {
			throw new Error("Authentication required");
		}

		const listingExists = await prisma.exists.Listing({ id: listing });

		const booking = await prisma.mutation.createBooking(
			{
        data: {

          ...data,
          author: {
            connect: {
              id: userId
            }
          },
          listing: {
            connect: {
              id: listing
            }
          }
        }
			},
			info
		);

		return booking;
	},

	// update booking
	async updateBooking(
		parent: any,
		args: { data: any; id: string },
		{ prisma, request }: any,
		info: any
	) {
		const { data, id } = args;
		const userId = getUserId(request);

		if (!userId) {
			throw new Error("Authentication required");
    }
    
		const booking = await prisma.mutation.UpdateReview({
			data,
			where: {
				id
			}
    });
    
    return booking
	},

	// delete booking
	async deleteBooking(
		parent: any,
		args: {id: string},
		{ prisma, request }: any,
		info: any
	) {
    const {id} = args;
    const userId = getUserId(request);

		if (!userId) {
			throw new Error("Authentication required");
    }
    
    const booking = await prisma.mutation.deleteBooking({
      where: {
        id
      }
    }, info)

    return booking;
	}
};
