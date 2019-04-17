import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import request from "supertest";
import { Pool } from "pg";
import { User } from "./../controllers/user";

let pool;

dotenv.config();
const pass = process.env.POSTGRES_PASSWORD;
const idToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1hcmlnaTEyMUBnbWFpbC5jb20iLCJpYXQiOjE1NTU0NTk4MzF9.RIgl3RGBy5na2L8AooVCtHat6wFxB8eK6y0fL01cqY0`;

beforeAll(async () => {
	pool = new Pool({
		user: process.env.POSTGRES_USER,
		password: pass,
		// password: "docker",
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_DB,
		port: 5432
	});
});

/* describe("gen auth token tests", () => {
	test("should generate a auth token", async () => {
		let token = User.generateAuthToken("foo@bar.com");
		let tester = jwt.sign({ id: "foo@bar.com" }, "wooasasdzxc").toString();
		expect(token).toEqual(tester);
	});
	test("auth tokens shouldn't be the same if salt is different", () => {
		let token = User.generateAuthToken("foo@bar.com");
		let tester = jwt.sign({ id: "foo@bar.com" }, "zxc").toString();
		expect(token).not.toEqual(tester);
	});
});

describe("find by auth token", () => {
	test("should return correct user id", async () => {
		let id = await User.findByToken(idToken);
		expect(id).toEqual(1);
	});
}); */

describe("registerUser", () => {
	const app = request("http://localhost:4000");
	test("should correctly register user foo@bar.com", () => {
		request("http://localhost:4000")
			.post("/users/register")
			.send({
				name: "foo",
				email: "foo@bar.com",
				password: "foobar"
			})
			.set("Accept", "application/json")
			.expect(200)
			.then((res) => {
				expect(res.body.email).toEqual("foo@bar.com");
			})
			.catch((e) => {
				return e;
			});
	});
	test("should correctly register user foo@bar.com", () => {
		request("http://localhost:4000")
			.post("/users/register")
			.send({
				name: "foo",
				email: "foo@bar.com",
				password: "foobar"
			})
			.set("Accept", "application/json")
			.expect(200)
			.then((res) => {
				expect(res.body.name).toEqual("foo");
			})
			.catch((e) => {
				return e;
			});
	});
	test("should correctly register user foo@bar.com", () => {
		request("http://localhost:4000")
			.post("/users/register")
			.send({
				name: "foo",
				email: "foo@bar.com",
				password: "foobar"
			})
			.set("Accept", "application/json")
			.expect(200)
			.then(async (res) => {
				let hash = await bcrypt.hash("foobar", 10);
				expect(res.body.token).toEqual(hash);
			})
			.catch((e) => {
				return e;
			});
	});
	test("should recieve auth token", () => {
		request("http://localhost:4000")
			.post("/users/register")
			.send({
				name: "foo",
				email: "foo@bar.com",
				password: "foobar"
			})
			.set("Accept", "application/json")
			.expect(200)
			.then(async (res) => {
				let token = User.generateAuthToken("foo@bar.com");
				expect(res.header["x-auth"]).toEqual(token);
			})
			.catch((e) => {
				return e;
			});
	});
});

describe("Login User", () => {
	test("should correctly login user foo@bar.com", () => {
		request("http://localhost:4000")
			.post("/users/signin")
			.send({
				email: "foo@bar.com",
				password: "foobar"
			})
			.set("Accept", "application/json")
			.then((res) => {
				expect(res.body.email).toEqual("foo@bar.com");
			})
			.catch((e) => {
				return e;
			});
	});
	test("should correctly login user foo@bar.com", () => {
		request("http://localhost:4000")
			.post("/users/signin")
			.send({
				email: "foo@bar.com",
				password: "foobar"
			})
			.set("Accept", "application/json")
			.then(async (res) => {
				let hashPass = await bcrypt.hash("foobar", 10);
				expect(res.body.hash).toEqual(hashPass);
			})
			.catch((e) => {
				return e;
			});
	});
	test("should correctly login user foo@bar.com", () => {
		request("http://localhost:4000")
			.post("/users/signin")
			.send({
				email: "foo@bar.com",
				password: "foobar"
			})
			.set("Accept", "application/json")
			.then(async (res) => {
				let token = await User.generateAuthToken("foo@bar.com");
				expect(res.header["x-auth"]).toEqual(token);
			})
			.catch((e) => {
				return e;
			});
	});
});

describe('Signout', () => {
	test('sign user out', () => {
		request('http://localhost:4000')
			.delete('/users/signout')
			.send({
				email: "foo@bar.com"
			})
			.set("Accept", "application/json")
			.then((res) => {
				expect(res.body.msg).toEqual("Logged out!");
			}).catch((e) => {
				return e;
			})
	})
});

afterAll(() => {
	pool = new Pool({
		user: process.env.POSTGRES_USER,
		password: pass,
		// password: "docker",
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_DB,
		port: 5432
	});
});
