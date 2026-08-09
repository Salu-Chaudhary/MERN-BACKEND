import z from "zod";

const orderValidation = z.object({
  orderItems: z
    .array(
      z.object({
        product: z.string("Product is required"),
        quantity: z.number("Quantity must be number").int().positive(),
      }),
    )
    .nonempty("Order item can not be empty"),
  totalPrice: z.number("Total price is required").int().positive(),
  shippingAddress: z.object({
    country: z.string().default("Nepal"),
    province: z.string("Province is required"),
    city: z.string("City is required"),
    street: z.string("Street is required"),
  }),
});

export default orderValidation;
