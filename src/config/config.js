import dotenv from "dotenv";

dotenv.config();
const config = {
  mongodbUrl: process.env.MONGODB_URL || "",
  port: process.env.PORT || "",
  jwtSecret: process.env.JWT_SECRET || "",
  appUrl: process.env.APP_URL || "",
  khalti: {
    secret: process.env.KHALTI_SECRET_KEY || "",
    apiUrl: process.env.KHALTI_API_URL || "",
  },
  resendKey: process.env.RESEND_KEY || "",
};

export default config;
