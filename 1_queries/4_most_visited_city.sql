SELECT city, count(reservations.id) AS total_reservations
FROM properties
JOIN reservations ON property_id = properties.id
group by city
ORDER BY total_reservations DESC