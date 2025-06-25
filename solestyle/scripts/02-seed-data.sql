-- Insert sample categories
INSERT INTO categories (id, name, slug, description, image_url) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Sneakers', 'sneakers', 'Comfortable and stylish sneakers for everyday wear', '/images/categories/sneakers.jpg'),
('550e8400-e29b-41d4-a716-446655440002', 'Boots', 'boots', 'Durable boots for all weather conditions', '/images/categories/boots.jpg'),
('550e8400-e29b-41d4-a716-446655440003', 'Sandals', 'sandals', 'Comfortable sandals for summer', '/images/categories/sandals.jpg'),
('550e8400-e29b-41d4-a716-446655440004', 'Dress Shoes', 'dress-shoes', 'Elegant dress shoes for formal occasions', '/images/categories/dress-shoes.jpg'),
('550e8400-e29b-41d4-a716-446655440005', 'Athletic', 'athletic', 'Performance athletic shoes for sports', '/images/categories/athletic.jpg');

-- Insert sample products
INSERT INTO products (id, name, slug, description, price, sale_price, category_id, brand, sku, featured) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Classic White Sneakers', 'classic-white-sneakers', 'Timeless white sneakers perfect for any casual outfit. Made with premium leather and comfortable cushioning.', 89.99, 79.99, '550e8400-e29b-41d4-a716-446655440001', 'StyleStep', 'SNK-001', TRUE),
('650e8400-e29b-41d4-a716-446655440002', 'Urban Runner Pro', 'urban-runner-pro', 'High-performance running shoes with advanced cushioning technology and breathable mesh upper.', 129.99, NULL, '550e8400-e29b-41d4-a716-446655440005', 'RunTech', 'ATH-001', TRUE),
('650e8400-e29b-41d4-a716-446655440003', 'Leather Combat Boots', 'leather-combat-boots', 'Rugged leather combat boots with steel toe protection and waterproof construction.', 159.99, 139.99, '550e8400-e29b-41d4-a716-446655440002', 'ToughWear', 'BOT-001', FALSE),
('650e8400-e29b-41d4-a716-446655440004', 'Summer Comfort Sandals', 'summer-comfort-sandals', 'Lightweight and comfortable sandals with arch support and non-slip sole.', 49.99, NULL, '550e8400-e29b-41d4-a716-446655440003', 'ComfortWalk', 'SAN-001', FALSE),
('650e8400-e29b-41d4-a716-446655440005', 'Oxford Business Shoes', 'oxford-business-shoes', 'Classic oxford dress shoes crafted from genuine leather with traditional styling.', 199.99, 179.99, '550e8400-e29b-41d4-a716-446655440004', 'Elegance', 'DRS-001', TRUE),
('650e8400-e29b-41d4-a716-446655440006', 'High-Top Basketball Shoes', 'high-top-basketball-shoes', 'Professional basketball shoes with ankle support and superior grip technology.', 149.99, NULL, '550e8400-e29b-41d4-a716-446655440005', 'CourtKing', 'ATH-002', FALSE);

-- Insert product images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
('650e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=400&width=400', 'Classic White Sneakers - Front View', 0, TRUE),
('650e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=400&width=400', 'Classic White Sneakers - Side View', 1, FALSE),
('650e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=400&width=400', 'Classic White Sneakers - Back View', 2, FALSE),
('650e8400-e29b-41d4-a716-446655440002', '/placeholder.svg?height=400&width=400', 'Urban Runner Pro - Front View', 0, TRUE),
('650e8400-e29b-41d4-a716-446655440002', '/placeholder.svg?height=400&width=400', 'Urban Runner Pro - Side View', 1, FALSE),
('650e8400-e29b-41d4-a716-446655440003', '/placeholder.svg?height=400&width=400', 'Leather Combat Boots - Front View', 0, TRUE),
('650e8400-e29b-41d4-a716-446655440004', '/placeholder.svg?height=400&width=400', 'Summer Comfort Sandals - Front View', 0, TRUE),
('650e8400-e29b-41d4-a716-446655440005', '/placeholder.svg?height=400&width=400', 'Oxford Business Shoes - Front View', 0, TRUE),
('650e8400-e29b-41d4-a716-446655440006', '/placeholder.svg?height=400&width=400', 'High-Top Basketball Shoes - Front View', 0, TRUE);

-- Insert product variants (sizes and colors)
INSERT INTO product_variants (product_id, size, color, stock_quantity, sku) VALUES
-- Classic White Sneakers
('650e8400-e29b-41d4-a716-446655440001', '7', 'White', 15, 'SNK-001-7-WHT'),
('650e8400-e29b-41d4-a716-446655440001', '8', 'White', 20, 'SNK-001-8-WHT'),
('650e8400-e29b-41d4-a716-446655440001', '9', 'White', 18, 'SNK-001-9-WHT'),
('650e8400-e29b-41d4-a716-446655440001', '10', 'White', 12, 'SNK-001-10-WHT'),
('650e8400-e29b-41d4-a716-446655440001', '11', 'White', 8, 'SNK-001-11-WHT'),
-- Urban Runner Pro
('650e8400-e29b-41d4-a716-446655440002', '8', 'Black', 25, 'ATH-001-8-BLK'),
('650e8400-e29b-41d4-a716-446655440002', '9', 'Black', 30, 'ATH-001-9-BLK'),
('650e8400-e29b-41d4-a716-446655440002', '10', 'Black', 22, 'ATH-001-10-BLK'),
('650e8400-e29b-41d4-a716-446655440002', '8', 'Blue', 20, 'ATH-001-8-BLU'),
('650e8400-e29b-41d4-a716-446655440002', '9', 'Blue', 18, 'ATH-001-9-BLU'),
-- Combat Boots
('650e8400-e29b-41d4-a716-446655440003', '8', 'Brown', 10, 'BOT-001-8-BRN'),
('650e8400-e29b-41d4-a716-446655440003', '9', 'Brown', 12, 'BOT-001-9-BRN'),
('650e8400-e29b-41d4-a716-446655440003', '10', 'Brown', 8, 'BOT-001-10-BRN'),
('650e8400-e29b-41d4-a716-446655440003', '8', 'Black', 15, 'BOT-001-8-BLK'),
('650e8400-e29b-41d4-a716-446655440003', '9', 'Black', 14, 'BOT-001-9-BLK'),
-- Summer Sandals
('650e8400-e29b-41d4-a716-446655440004', '7', 'Tan', 20, 'SAN-001-7-TAN'),
('650e8400-e29b-41d4-a716-446655440004', '8', 'Tan', 25, 'SAN-001-8-TAN'),
('650e8400-e29b-41d4-a716-446655440004', '9', 'Tan', 18, 'SAN-001-9-TAN'),
-- Oxford Shoes
('650e8400-e29b-41d4-a716-446655440005', '8', 'Black', 12, 'DRS-001-8-BLK'),
('650e8400-e29b-41d4-a716-446655440005', '9', 'Black', 15, 'DRS-001-9-BLK'),
('650e8400-e29b-41d4-a716-446655440005', '10', 'Black', 10, 'DRS-001-10-BLK'),
('650e8400-e29b-41d4-a716-446655440005', '8', 'Brown', 8, 'DRS-001-8-BRN'),
('650e8400-e29b-41d4-a716-446655440005', '9', 'Brown', 10, 'DRS-001-9-BRN'),
-- Basketball Shoes
('650e8400-e29b-41d4-a716-446655440006', '9', 'Red', 15, 'ATH-002-9-RED'),
('650e8400-e29b-41d4-a716-446655440006', '10', 'Red', 18, 'ATH-002-10-RED'),
('650e8400-e29b-41d4-a716-446655440006', '11', 'Red', 12, 'ATH-002-11-RED');

-- Insert sample admin user (password: admin123)
INSERT INTO users (id, email, password_hash, first_name, last_name, role) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'admin@shoestore.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQ', 'Admin', 'User', 'admin');

-- Insert sample customer (password: customer123)
INSERT INTO users (id, email, password_hash, first_name, last_name, role) VALUES
('750e8400-e29b-41d4-a716-446655440002', 'customer@example.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQ', 'John', 'Doe', 'customer');

-- Insert sample reviews
INSERT INTO product_reviews (product_id, user_id, rating, title, comment, verified_purchase) VALUES
('650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440002', 5, 'Excellent quality!', 'These sneakers are incredibly comfortable and well-made. Perfect for daily wear.', TRUE),
('650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440002', 4, 'Great for running', 'Good cushioning and support. Would recommend for casual runners.', TRUE);
