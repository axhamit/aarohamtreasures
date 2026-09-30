import { BasketIcon } from "@sanity/icons/Basket";
import { defineArrayMember, defineField, defineType } from "sanity";

export const cartType = defineType({
  name: "cart",
  title: "Cart",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "authUserId",
      title: "User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "authUserId",
      subtitle: "updatedAt",
    },
  },
});
