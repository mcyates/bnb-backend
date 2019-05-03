import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken";
import getUserId from "../../utils/getUserId";

export const user = {
	// Create a new user
	async createUser(
		parent: any,
		args: {
			data: {
				name: string;
				email: string;
				password: string;
			};
		},
		{ prisma }: any,
		info: any
	) {
		const data = args.data;

		const emailTaken = await prisma.exists.User({ email: data.email });
		if (emailTaken) {
			throw new Error("Email taken");
		}
		if (data.password.length < 8) {
			throw new Error("Password must be atleast 8 characters or longer");
		}

		const password = await bcrypt.hash(data.password, 10);

		const user = await prisma.mutation
			.createUser({
				data: {
					...data,
					password
				}
			})
			.catch((e: void) => console.error(e));
		return {
			user,
			token: generateToken(user.id)
		};
	},
	// Login the User
	//
	async loginUser(parent: any, args: any, { prisma }: any, info: any) {
		const { data } = args;

		const user = await prisma.query.user({
			where: {
				email: data.email
			}
		});

		if (!user) {
			throw new Error("User not found");
		}

		const isMatch = await bcrypt.compare(data.password, user.password);
		if (!isMatch) {
			throw new Error("Incorrect Email or Password");
		}

		return {
			user,
			token: generateToken(user.id)
		};
	},
	// Update a user
	async updateUser(
		parent: any,
		args: {
			id: any;
			data: {
				name: string;
				email: string;
				password: string;
			};
		},
		{ prisma, request }: any,
		info: any
	) {
		const { data } = args;
		const userId = getUserId(request);

		const userExists = await prisma.exists.User({ id: userId });
		if (!userExists) {
			throw new Error("User not found");
		}
		if (data.password.length < 8) {
			throw new Error("Password must be 8 characters or longer");
		}
		const password = await bcrypt.hash(data.password, 10);

		return prisma.mutation
			.updateUser(
				{
					where: {
						id: userId
					},
					data: {
						...data,
						password
					}
				},
				info
			)
			.catch((e: void) => console.error(e));
	},
	// Delete a user
	async deleteUser(
		parent: any,
		args: { id: any },
		{ prisma, request }: any,
		info: any
	) {
		const userId = getUserId(request);
		const userExists = await prisma.exists.User({ id: userId });
		if (!userExists) {
			throw new Error("User not found");
		}
		const user = await prisma.mutation
			.deleteUser(
				{
					where: {
						id: userId
					}
				},
				info
			)
			.catch((e: void) => console.error(e));
		return user;
	}
};
