const TABLE_NAME = 'all-for-you';
const config = {
    PORT: process.env.PORT || 4000,
    DB_CONNECTION: `mongodb+srv://project1:Squadra@cluster0.72nhdqq.mongodb.net/`,
    SECRET: 'badumts',
    SALT: 10,
    COOKIE_NAME: 'USER_SESSION',
    CLOUDINARY_NAME: 'dg2er7uai',
    CLOUDINARY_API_KEY: 889764886824357,
    CLOUDINARY_API_SECRET: '5uQf2volxhbbsqFgkWmwt_oDsX4',
    CLOUDINARY_STORAGE: 'rledez7m'
}

module.exports = config;