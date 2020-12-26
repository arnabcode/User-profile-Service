const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  tableName: "user_types",
  columns: {
    typeId: {
      type: "varchar",
      primary: true,
    },
    typeCode: {
      type: "varchar",
      nullable: false,
    },
    typeName: {
      type: "varchar",
      nullable: false,
    },
    description: {
      type: "varchar2",
    },
  },
});
