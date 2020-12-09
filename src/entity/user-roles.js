const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  tableName: "user_roles",
  columns: {
    roleCode: {
      type: "varchar",
      primary: true,
    },
    description: {
      type: "varchar",
      nullable: false,
    },
    status: {
      type: "varchar",
      nullable: false,
    },
  },
});
