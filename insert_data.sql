-- Insert data into User table
INSERT INTO User (id, firstName, lastName, username, password, mail, role, createdAt, updatedAt)
VALUES
  (1, 'John', 'Doe', 'john_doe', 'password123', 'john.doe@example.com', 'user', NOW(), NOW()),
  (2, 'Jane', 'Smith', 'jane_smith', 'securepass', 'jane.smith@example.com', 'admin', NOW(), NOW(),
  (3, 'Bob', 'Brown', 'bob_brown', 'password', 'bob.brown@example.com', 'user', NOW(), NOW());

-- Insert data into Movie table
INSERT INTO Movie (id, title, description, releaseDate, director, createdAt, updatedAt)
VALUES
  (1, 'Inception', 'A mind-bending thriller', '2010-07-16', 'Christopher Nolan', NOW(), NOW()),
  (2, 'The Shawshank Redemption', 'Two imprisoned men bond over several years', '1994-09-23', 'Frank Darabont', NOW(), NOW());

-- Insert data into Favorite table
INSERT INTO Favorite (id, userId, movieId, createdAt, updatedAt)
VALUES
  (1, 1, 1, NOW(), NOW()),
  (2, 2, 2, NOW(), NOW()
  (3, 3, 1, NOW(), NOW());