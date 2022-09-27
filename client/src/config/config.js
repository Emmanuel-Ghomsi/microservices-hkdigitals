const dotEnv = require("dotenv");
dotEnv.config();

export const APP_URL_AUTH = `${process.env.URL_AUTH}`
export const APP_URL_RESUME = `${process.env.URL_RESUME}`
export const APP_URL_IMAGE = `${process.env.URL_IMAGE}`