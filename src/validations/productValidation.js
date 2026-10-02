import z from "zod";
const productCreateSchema = z.object({
  name: z.string("Name is required"),
  description: z
    .string("Description is required")
    .min(10, "Description must be at least 10 character"),
  color: z.array("Color is required"),
  size: z.array(z.union([z.string(), z.number()])),
  type: z.string("Type is required"),
  price: z.coerce
    .number()
    .positive("Price must be strictly greater than 0.")
    .max(100000, "Price must be lower than 100000."),
  stock: z.coerce
    .number()
    .int("Inventory must be a whole number.")
    .nonnegative("Inventory can not be negative."),
});

export default productCreateSchema;
