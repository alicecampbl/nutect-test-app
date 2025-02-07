const InvariantError = require("../exceptions/InvariantError");
const AuthenticationError = require("../exceptions/AuthenticationError");
const pool = require("./config");
const bcrypt = require("bcrypt");

class Users {
  static async addUser({ email, first_name, last_name, password }) {
    const cryptedPassword = await bcrypt.hash(password, 10);
    const img = null;
    const balance = 50000;
    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4, $5, $6)",
      values: [email, cryptedPassword, first_name, last_name, img, balance],
    };

    await pool.query(query);

    // console.log(result);
  }

  static async loginUser({ email, password }) {
    const query = {
      text: "SELECT password FROM users WHERE email = $1",
      values: [email],
    };

    const result = await pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError("Email atau password salah (email)", 103);
    }

    const { password: cryptedPassword } = result.rows[0];

    const isMatch = await bcrypt.compare(password, cryptedPassword);

    if (!isMatch) {
      throw new AuthenticationError(
        "Email atau password salah (password)",
        103
      );
    }
  }

  static async checkEmail(email) {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };

    const result = await pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError("Email salah atau tidak ditemukan!", 103);
    }
  }

  static async getUserPofile(email) {
    const query = {
      text: "SELECT email, first_name, last_name, profile_image FROM users WHERE email = $1",
      values: [email],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }

  static async updateProfile({ email, firstName, lastName }) {
    const query = {
      text: "UPDATE users SET first_name = $2, last_name = $3 WHERE email = $1",
      values: [email, firstName, lastName],
    };

    await pool.query(query);
  }

  static async updateProfileImage(email, profileLink) {
    const query = {
      text: "UPDATE users SET profile_image = $2 WHERE email = $1",
      values: [email, profileLink],
    };

    await pool.query(query);
  }

  static async getBalance(email) {
    const query = {
      text: "SELECT balance from users WHERE email = $1",
      values: [email],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }

  static async updateBalance({ email, amount }) {
    const query = {
      text: "UPDATE users SET balance = $2 WHERE email = $1",
      values: [email, amount],
    };

    await pool.query(query);
  }
}

module.exports = Users;
