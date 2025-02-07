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
  pgm.createTable("banners", {
    id: "id",
    banner_name: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    banner_image: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    description: {
      type: "VARCHAR(50)",
      notNull: true,
    },
  });

  // insert dummy banner
  pgm.sql(
    "INSERT INTO banners(banner_name, banner_image, description) VALUES('Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lorem Ipsum Dolor sit amet')"
  );
  pgm.sql(
    "INSERT INTO banners(banner_name, banner_image, description) VALUES('Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lorem Ipsum Dolor sit amet')"
  );
  pgm.sql(
    "INSERT INTO banners(banner_name, banner_image, description) VALUES('Banner 3', 'https://nutech-integrasi.app/dummy.jpg', 'Lorem Ipsum Dolor sit amet')"
  );
  pgm.sql(
    "INSERT INTO banners(banner_name, banner_image, description) VALUES('Banner 4', 'https://nutech-integrasi.app/dummy.jpg', 'Lorem Ipsum Dolor sit amet')"
  );
  pgm.sql(
    "INSERT INTO banners(banner_name, banner_image, description) VALUES('Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lorem Ipsum Dolor sit amet')"
  );
  pgm.sql(
    "INSERT INTO banners(banner_name, banner_image, description) VALUES('Banner 6', 'https://nutech-integrasi.app/dummy.jpg', 'Lorem Ipsum Dolor sit amet')"
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("banners");
};
