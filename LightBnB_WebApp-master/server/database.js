const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const res = require('express/lib/response');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
  .query(`SELECT * FROM users WHERE email = $1`, [email])
  .then((result) => result.rows[0].id ? result.rows[0] : null)
  .catch((err) => {
    console.log('error:', err.message);
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query(`SELECT * FROM users WHERE id = $1`, [id])
  .then((result) => {
    if (result.rows[0].id) {
      return result.rows[0];
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log('error:', err.message);
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool
  .query(`INSERT INTO users (name, email, password)
          VALUES ($1, $2, $3)
          RETURNING *;`, [user.name, user.email, user.password])
  .then((result) => {
    if (result.rows[0].id) {
      return result.rows[0];
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log('error:', err.message);
  })
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
  .query(`SELECT * FROM reservations
          JOIN properties ON reservations.property_id = properties.id
          WHERE guest_id = $1
          LIMIT $2`, [guest_id, limit])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log('error:', err.message);
  });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  let addWHERE = 'WHERE'

  if (options.city) {
    if (addWHERE) {
      queryString += 'WHERE ';
      addWHERE = ''
    }
    queryParams.push(`%${options.city.charAt(0).toUpperCase() + options.city.slice(1)}%`);
    queryString += `city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    if (addWHERE) {
      queryString += 'WHERE ';
      addWHERE = ''
    }
    if(queryParams.length > 0) {
      queryString += 'AND '
    }
    queryParams.push(parseInt(`${options.owner_id}`));
    queryString += `owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    if (addWHERE) {
      queryString += 'WHERE ';
      addWHERE = ''
    }
    if(queryParams.length > 0) {
      queryString += 'AND '
    }
    queryParams.push(parseInt(`${options.minimum_price_per_night}`));
    queryString += `cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    if (addWHERE) {
      queryString += 'WHERE ';
      addWHERE = ''
    }
    if(queryParams.length > 0) {
      queryString += 'AND '
    }
    queryParams.push(parseInt(`${options.maximum_price_per_night}`));
    queryString += `cost_per_night <= $${queryParams.length} `;
  }

  if (options.minimum_rating) {
    if (addWHERE) {
      queryString += 'WHERE ';
      addWHERE = ''
    }
    if(queryParams.length > 0) {
      queryString += 'AND '
    }
    queryParams.push(parseInt(`${options.minimum_rating}`));
    queryString += `rating >= $${queryParams.length} `;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log('queryString', queryString, 'queryParams', queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
