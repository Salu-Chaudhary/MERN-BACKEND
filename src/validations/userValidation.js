import z from "zod";
import { ADMIN_ROLE, MERCHANT_ROLE, USER_ROLE } from "../constants/roles.js";

const userRegisterSchema = z.object({
  name: z.string().min(3, "Username should be at least 3 character long"),
  email: z.email("Enter valid email"),
  mobile: z
    .string()
    .min(10, "Mobile number should be exactly 10 digits")
    .max(10, "Mobile number should be exactly 10 digits"),
  password: z
    .string()
    .min(8, "Password length must be at least 8 character long"),
  address: z.object({
    country: z.string().optional(),
    province: z.string().min(3, { message: "Province is required" }),
    city: z.string().min(3, { message: "City is required" }),
  }),
  role: z.enum([ADMIN_ROLE, MERCHANT_ROLE, USER_ROLE]).default(USER_ROLE),
});

export default userRegisterSchema;
