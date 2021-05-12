const { Pool } = require("pg");

const pool = new pool ({

    user: "postgres",
    host: "datsbase.server.com",
    database:"blogdata",
    port: 5432,

});

module.exports = {

    query: (text, params) => pool.query(text, params),


};