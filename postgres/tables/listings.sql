BEGIN TRANSACTION;
CREATE TABLE listings (
  listingId serial PRIMARY KEY,
  userId INT REFERENCES users(userId),
  name VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL,
  location varchar NOT NULL,
  pictureUrl VARCHAR NOT NULL,
  pictures VARCHAR[],
  created TIMESTAMP NOT NULL,
  description VARCHAR NOT NULL,
  price INT NOT NULL,
  guests INT NOT NULL,
  beds INT NOT NULL,
  bedrooms INT NOT NULL,
  bath INT NOT NULL,
  amenities varchar[]
);
COMMIT;