/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("transactions_history", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    user_email: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    service_code: {
      type: "VARCHAR(30)",
      notNull: true,
    },
    invoice_number: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    transaction_type: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    description: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    total_amount: {
      type: "INT",
      notNull: true,
    },
    created_on: {
      type: "TIMESTAMPTZ",
      notNull: true,
    },
  });

  // add foreign key constraint for user_id column
  pgm.addConstraint(
    "transactions_history",
    "fk_transactions_history.user_email_users.email",
    "FOREIGN KEY(user_email) REFERENCES users(email) ON DELETE CASCADE"
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("transactions_history");
};
