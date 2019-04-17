import dotenv from 'dotenv';
import express from 'express';
import { QueryResult, Pool } from "pg";

dotenv.config();
const pass = process.env.POSTGRES_PASSWORD;

export const pool = new Pool({
	user: process.env.POSTGRES_USER,
	password: pass,
	// password: "docker",
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	port: 5432
});

export class Listing {
  
}

export default Listing;