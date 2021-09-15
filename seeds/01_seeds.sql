INSERT INTO users (name, email, password)
VALUES ('James', 'hotmail@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Steve', 'yahoo@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Sarah', 'gmail@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, 
number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Speed lamp', 'description' , 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',
930.61, 6, 4, 8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', 28142, TRUE),
(2, 'Habit mix', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg',
46058, 0, 5, 6, 'Canada', '1650 Hejto Center', 'Genwezuj', 'Newfoundland And Labrador', 44583, TRUE),
(3, 'Game fill', 'description', 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg',
23428, 5, 6, 4, 'Canada', '834 Buwmi Road', 'Rotunif', 'Newfoundland And Labrador', 58224, TRUE);

INSERT INTO reservations (start_date, end_date, guest_id, property_id)
VALUES ('2018-09-11', '2018-09-26', 1, 3),
('2019-01-04', '2019-02-01', 2, 1),
('2021-10-01', '2021-10-14', 3, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 3, 1, 4, 'Nice and close to places'),
(2, 1, 2, 1, 'Smaller then the pictures'),
(3, 2, 3, 5, 'Perfect location'); 