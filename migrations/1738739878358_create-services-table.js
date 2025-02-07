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
  pgm.createTable("services", {
    service_code: {
      type: "VARCHAR(30)",
      primaryKey: true,
    },
    service_name: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    service_icon: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    service_tarif: {
      type: "INT",
      notNull: true,
    },
  });

  // dummy services data
  pgm.sql(
    "INSERT INTO services VALUES('PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000)"
  );
  pgm.sql(
    "INSERT INTO services VALUES('PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000)"
  );
  pgm.sql(
    "INSERT INTO services VALUES('PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000)"
  );
  pgm.sql(
    "INSERT INTO services VALUES('PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000)"
  );
  pgm.sql(
    "INSERT INTO services VALUES('PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000)"
  );
  pgm.sql(
    "INSERT INTO services VALUES('MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000)"
  );
  pgm.sql(
    "INSERT INTO services VALUES('TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000)"
  );
  pgm.sql(
    "INSERT INTO services VALUES('PAKET_DATA', 'Paket data', 'https://nutech-integrasi.app/dummy.jpg', 50000)"
  );
  pgm.sql(
    "INSERT INTO services VALUES('VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000)"
  );
  pgm.sql(
    "INSERT INTO services VALUES('VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 10000)"
  );
  pgm.sql(
    "INSERT INTO services VALUES('QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000)"
  );
  pgm.sql(
    "INSERT INTO services VALUES('ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000)"
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("services");
};
