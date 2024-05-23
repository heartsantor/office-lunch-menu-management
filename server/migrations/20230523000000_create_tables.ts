import { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable("users", {
    id: "id",
    username: { type: "varchar(255)", notNull: true, unique: true },
    password: { type: "varchar(255)", notNull: true },
    isAdmin: { type: "boolean", notNull: true, default: false },
  });

  pgm.createTable("menus", {
    id: "id",
    date: { type: "date", notNull: true },
    option: { type: "varchar(255)", notNull: true },
  });

  pgm.createTable("choices", {
    id: "id",
    userId: { type: "integer", references: "users(id)", onDelete: "CASCADE" },
    menuId: { type: "integer", references: "menus(id)", onDelete: "CASCADE" },
    chosenOption: { type: "varchar(255)", notNull: true },
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable("choices");
  pgm.dropTable("menus");
  pgm.dropTable("users");
};
