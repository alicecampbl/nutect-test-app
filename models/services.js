const pool = require("./config");

class Services {
  static async getAllServices() {
    const result = await pool.query("SELECT * FROM services");

    return result.rows;
  }
}

module.exports = Services;
