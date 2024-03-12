CREATE TABLE IF NOT EXISTS tamagotchi_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2),
    category VARCHAR(255) NOT NULL,
    image TEXT NOT NULL
);