import bcrypt from 'bcryptjs';

export const user = {
  async createUser(
    parent: any, args: {data: {
      name: string, email: string, password: string
    }}, {prisma}: any, info: any
  ) {

  },
}