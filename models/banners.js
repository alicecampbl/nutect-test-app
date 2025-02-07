const pool = require("./config");

class Banners {
  static async getAllBanners() {
    const result = await pool.query("SELECT * FROM banners");

    return result.rows;
  }
}

module.exports = Banners;
