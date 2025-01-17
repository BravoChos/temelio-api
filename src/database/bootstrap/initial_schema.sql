CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,     
    email VARCHAR(100) NOT NULL UNIQUE,  
    "password" VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),                      
    last_name VARCHAR(100),                    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,      
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     
    deactivated_at TIMESTAMP DEFAULT NULL                
);

CREATE TABLE IF NOT EXISTS foundations (
    id SERIAL PRIMARY KEY,
    code VARCHAR(8) NOT NULL UNIQUE,                            
    "name" VARCHAR(100),                              
    "type" VARCHAR(50),                                
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nonprofits (
    id SERIAL PRIMARY KEY,
    code VARCHAR(8) NOT NULL UNIQUE,     
    "name" VARCHAR(100),                              
    "address" VARCHAR(255),                              
    email VARCHAR(100),                              
    "type" VARCHAR(50),     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE foundation_nonprofit (
    foundation_id INT NOT NULL,
    nonprofit_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_foundation_nonprofit UNIQUE (foundation_id, nonprofit_id)
);

CREATE TYPE email_logs_status AS ENUM ('PENDING', 'DELIVERED', 'FAILED');

CREATE TABLE IF NOT EXISTS email_logs (
    id SERIAL PRIMARY KEY,
    "to" VARCHAR(100) NOT NULL,
    "from" VARCHAR(100) NOT NULL,
    template_id int NOT NULL,
    sender_id int NOT NULL,
    "status" email_logs_status DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE template_type AS ENUM ('BASIC', 'FORMAL', 'NEW');

CREATE TABLE IF NOT EXISTS templates (
    id SERIAL PRIMARY KEY,
    "subject" VARCHAR(100) NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "type" template_type DEFAULT 'BASIC',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password, first_name, last_name)
VALUES
  ('admin', 'admin@example.com', '1234', 'James', 'Kim'),
  ('client', 'client@example.com', '1234', 'Will', 'Kim');

INSERT INTO foundations (id, code, name)
VALUES
  (1111,'TM1234', 'GOODWILL');

INSERT INTO nonprofits (id, code, name, address, email, type)
VALUES
  (1234, 'TN1234', 'org-1', 'Los Angeles', 'org-1@example.com', 'ENTERTAINMENT'),
  (4567, 'TN4567', 'org-2', 'New York', 'org-2@example.com', 'EDUCATION');

INSERT INTO foundation_nonprofit (foundation_id, nonprofit_id)
VALUES
  (1111, 1234),
  (1111, 4567);

INSERT INTO email_logs ("to", "from", template_id, sender_id, "status")
VALUES
  ('org-1@example.com', 'GOODWILL@example.com', 1, 1111, 'PENDING'),
  ('org-2@example.com', 'GOODWILL@example.com', 1, 1111, 'DELIVERED');

INSERT INTO templates ("subject", "message")
VALUES
  ('Notice', 'Sending money to nonprofit ${ name } at address ${ address }');
