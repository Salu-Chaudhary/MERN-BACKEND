import { Resend } from "resend";
import config from "../config/config.js";
const sendEmail = async (data) => {
  const resend = new Resend(config.resendKey);

  resend.emails.send({
    from: "onboarding@resend.dev", // for development hamile yai email use garnu parxa
    to: data.receipients,
    subject: "Password Reset Request",
    html: `<a href="${data.resetPasswordLink}">Click here to reset password</a>`,
  });
};

export { sendEmail };
