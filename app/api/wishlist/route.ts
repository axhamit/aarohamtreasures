import { backendClient } from "@/sanity/lib/backendClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { authUserId, productIds } = body;

  if (!authUserId || !Array.isArray(productIds)) {
    return NextResponse.json(
      { error: "Missing authUserId or productIds." },
      { status: 400 }
    );
  }

  const wishlistId = `wishlist_${authUserId}`;
  const wishlistDoc = {
    _id: wishlistId,
    _type: "wishlist",
    authUserId,
    products: productIds.map((productId: string) => ({
      _type: "reference",
      _ref: productId,
    })),
    updatedAt: new Date().toISOString(),
  };

  await backendClient.createOrReplace(wishlistDoc);

  return NextResponse.json({ success: true, wishlistId });
}
