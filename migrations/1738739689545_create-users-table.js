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
  pgm.createTable("users", {
    email: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    password: {
      type: "VARCHAR(100)",
      notNull: true,
    },
    first_name: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    last_name: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    profile_image: {
      type: "VARCHAR(50)",
      default: null,
    },
    balance: {
      type: "INT",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("users");
};
