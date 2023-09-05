-- Tabela cities
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Tabela passengers
CREATE TABLE passengers (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL
);

-- Tabela flights
CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    origin INT REFERENCES cities(id),
    destination INT REFERENCES cities(id),
    date DATE NOT NULL
);

-- Tabela travel
CREATE TABLE travel (
    id SERIAL PRIMARY KEY,
    passengerId INT REFERENCES passengers(id),
    flightId INT REFERENCES flights(id)
);
