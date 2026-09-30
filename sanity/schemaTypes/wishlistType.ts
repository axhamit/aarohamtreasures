import { HeartIcon } from "@sanity/icons/Heart";
import { defineArrayMember, defineField, defineType } from "sanity";

export const wishlistType = defineType({
  name: "wishlist",
  title: "Wishlist",
  type: "document",
  icon: HeartIcon,
  fields: [
    defineField({
      name: "authUserId",
      title: "User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "products",
      title: "Wishlisted Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "product" }],
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
