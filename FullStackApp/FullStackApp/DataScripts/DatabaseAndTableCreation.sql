CREATE Database Adoption
GO

USE Adoption

CREATE TABLE Pets (
  PetId INT PRIMARY KEY IDENTITY,
  Name NVARCHAR(100),
  Type NVARCHAR(50),
  Breed NVARCHAR(50),
  Age INT,
  Description NVARCHAR(MAX)
);


CREATE TABLE Favorites (
  FavoriteId INT PRIMARY KEY IDENTITY,
  UserId NVARCHAR(50),
  PetId INT,
  FOREIGN KEY (PetId) REFERENCES Pets(PetId)
);
