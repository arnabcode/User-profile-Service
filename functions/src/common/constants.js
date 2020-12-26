exports.SCRAPPING_SERVICE_URL = "http://localhost:4001";

exports.ERROR_CONSTANTS = {
  INTERNAL_SERVER_ERROR: {
    code: "INT_SERV_ERR",
    message: "Internal Server Error!",
  },
  NOT_FOUND_ERROR: {
    code: "NF001",
    message: "Resource not Found!",
  },
  INVALID_VALUE: {
    code: 400,
    message: "Value provided is invalid for ",
  },
  MISSING_VALUE: {
    code: 200,
    message: " : field cannot be empty or missing",
  },
  PRICE_UNDEFINED: {
    code: "PR_001",
    message: "'price' of product cannot be missing",
  },
  USER_ID_UNDEFINED: {
    code: "PR_002",
    message: " 'userId'  cannot be empty or missing",
  },
  IMG_URL_UNDEFINED: {
    code: "PR_003",
    message: " 'imageUrl' of product cannot be empty or missing",
  },
  WBSTE_ID_UNDEFINED: {
    code: "PR_004",
    message: " 'websiteId' of  the product cannot be empty or missing",
  },
  PRDCT_URL_UNDEFINED: {
    code: "PR_005",
    message: " 'productUrl'  cannot be empty or missing",
  },
  PRDCT_ID_UNDEFINED: {
    code: "PR_005",
    message: " 'productId'  cannot be empty or missing",
  },
  OFFR_TXT_UNDEFINED: {
    code: "OF_001",
    message: " 'offerText' cannot be empty or missing",
  },
  OFFR_TYPE_UNDEFINED: {
    code: "OF_002",
    message: " 'offerText' cannot be empty or missing",
  },
  OFFR_VALD_UNDEFINED: {
    code: "OF_003",
    message: " 'offerText' cannot be empty or missing",
  },
  OFFR_INVALD_DAT: {
    code: "OF_004",
    message: " 'validTill' is not a valid Date",
  },
  MISNG_TOKEN: {
    code: "AUTH_01",
    message: "Unauthorised request. Token missing from header",
  },
};

exports.MESSAGE_CONSTANTS = {
  PROD_SAV_SUCCS: {
    code: "PR_101",
    message: "Product saved successfully : ",
  },
  PROD_DEL_SUCCS: {
    code: "PR_102",
    message: "Product Deleted Successfully",
  },
  PROD_FOUND_SUCCS: {
    code: "PR_103",
    message: "Product found successfully",
  },
  PROD_NOT_FOUND: {
    code: "PR_104",
    message: "Product does not exist in the system",
  },
  PRODS_FTCH_SUCCS: {
    code: "PR_105",
    message: "Succesfully fethched all products in system",
  },
  NO_PRODS_FOUND: {
    code: "PR_106",
    message: "NO products found in the system",
  },
  OFFR_SAVD_SUCCS: {
    code: "OF_101",
    message: "Offer Saved successfully",
  },
  GET_OFFR_SUCCS: {
    code: "OF_102",
    message: "Fetched Offers  successfully",
  },
};

exports.STATUS_CODES = {
  NOT_FOUND: 404,
  INVALID_INPUT: 400,
  SUCCESS: 200,
  INTERNAL_SERVER_ERROR: 500,
};

exports.CONSTANTS = {
  USER_ID_PREFIX: "US.",
  ACTIVE_STATUS: "Y",
  INACTIVE_STATUS: "N",
};

exports.USER_ROLES = {
  SUBSCRIBER: "SUBSCRIBER",
};
