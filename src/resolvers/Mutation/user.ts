import bcrypt from 'bcryptjs';
import generateToken  from '../../utils/generateToken';
import getUserId from '../../utils/getUserId';

export const user = {
  async createUser(
    parent: any, args: {data: {
      name: string, email: string, password: string
    }}, {prisma}: any, info: any
  ) {
    const data = args.data;

    const emailTaken = await prisma.exists.User({ email: data.email});
    if (emailTaken) {
      throw new Error('Email taken')
    }
    if (data.password.length < 8) {
      throw new Error('Password must be atleast 8 characters or longer')
    }

    const password = await bcrypt.hash(data.password, 10);

    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password
      }
    }).catch((e: void) => console.error(e));
    return {
      user,
      token: generateToken(user.id)
    };
  },
}