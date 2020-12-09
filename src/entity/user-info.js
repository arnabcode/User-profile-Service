const EntitySchema = require("typeorm").EntitySchema;
const { UserInfo } = require("../models/user-info-model");

module.exports = new EntitySchema({
  name: "user_info",

  columns: {
    userId: {
      type: "varchar",
      primary: true,
    },
    email: {
      type: "varchar",
      nullable: false,
      unique: true,
    },
    firstName: {
      type: "varchar",
      nullable: false,
    },
    lastName: {
      type: "varchar",
      nullable: false,
    },
    userType: {
      type: "varchar",
      nullable: false,
    },
    dob: {
      type: "date",
      nullable: false,
    },
    status: {
      type: "varchar",
      nullable: false,
    },
    createdOn: {
      type: "timestamp",
      nullable: false,
    },
    modifiedOn: {
      type: "timestamp",
      nullable: false,
    },
    lastLogin: {
      type: "timestamp",
      nullable: false,
    },
  },
});
