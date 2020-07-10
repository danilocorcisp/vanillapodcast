const spicedPg = require("spiced-pg");
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUser, dbPass } = require("./secrets.json");
    db = spicedPg(
        "postgres:" + dbUser + ":" + dbPass + "@localhost:5432/ovrcast"
    );
}

// USER SIDE

exports.addUserAccount = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [first, last, email, password]
    );
};

module.exports.getPw = (email) => {
    return db.query(
        `SELECT *
        FROM users 
        WHERE email = $1`,
        [email]
    );
};

exports.createResetCode = (email, code) => {
    console.log("exports.createResetCode -> email, code", email, code);
    return db.query(
        `INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING id`,
        [email, code]
    );
};

exports.updatePass = (email, password) => {
    return db.query(
        `UPDATE users
        SET password = $2
        WHERE email = $1`,
        [email, password]
    );
};

exports.resetCode = (email) => {
    console.log("exports.resetCode -> email", email);
    return db.query(
        `SELECT * FROM reset_codes
        WHERE email = $1 
        AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
        ORDER BY created_at DESC
        LIMIT 1`,
        [email]
    );
};

exports.getUser = (email) => {
    return db.query(
        `SELECT *
        FROM users 
        WHERE email = $1`,
        [email]
    );
};

exports.getUserId = (id) => {
    return db.query(
        `SELECT *
        FROM users 
        WHERE id = $1`,
        [id]
    );
};

exports.addImage = (id, image) => {
    return db.query(
        `UPDATE users
        SET image = $2
        WHERE id = $1
        RETURNING image`,
        [id, image]
    );
};

// PODCAST SIDE

exports.matchSearch = (query) => {
    return db.query(
        `SELECT id, first, last, bio, image 
        FROM users 
        WHERE first ILIKE $1`,
        [query + "%"]
    );
};

// fim
