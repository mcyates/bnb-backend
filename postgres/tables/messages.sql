BEGIN TRANSACTION;
CREATE TABLE Messages (
  msgId serial PRIMARY KEY,
  text varchar NOT NULL,
  userId INT REFERENCES users(userId),
  listingId INT REFERENCES listings(listingId)
);
COMMIT;