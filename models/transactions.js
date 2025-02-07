const pool = require("./config");
const { nanoid } = require("nanoid");

class Transactions {
  static async createTransaction(params) {
    const { userEmail, serviceCode, transactionType, description, amount } =
      params;

    const id = `transaction-${nanoid(15)}`;
    const invoiceNumber = `INV-${nanoid(12)}`; //mungkin bakal collision
    const createdDate = new Date().toISOString();

    const query = {
      text: "INSERT INTO transactions_history VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
      values: [
        id,
        userEmail,
        serviceCode,
        invoiceNumber,
        transactionType,
        description,
        amount,
        createdDate,
      ],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }

  static async getAllTransaction(email) {
    const query = {
      text: "SELECT invoice_number, transaction_type, description, total_amount, created_on FROM transactions_history WHERE user_email = $1 ORDER BY created_on DESC",
      values: [email],
    };

    const result = await pool.query(query);

    return result.rows;
  }

  static async getCurrentTransaction(id) {
    const query = {
      text: "SELECT h.invoice_number, h.service_code, s.service_name, h.transaction_type, h.total_amount, h.created_on FROM transactions_history h JOIN services s ON h.service_code = s.service_code WHERE h.id = $1",
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }
}

module.exports = Transactions;
