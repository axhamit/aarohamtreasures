import { backendClient } from "@/sanity/lib/backendClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { authUserId, items } = body;

  if (!authUserId || !Array.isArray(items)) {
    return NextResponse.json(
      { error: "Missing authUserId or cart items." }, 
      { status: 400 }
    );
  }

  const cartId = `cart_${authUserId}`;
  const cartDoc = {
    _id: cartId,
    _type: "cart",
    authUserId,
    products: items.map((item: { productId: string; quantity: number }) => ({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: item.productId,
      },
      quantity: item.quantity ?? 1,
    })),
    updatedAt: new Date().toISOString(),
  };

  await backendClient.createOrReplace(cartDoc);

  return NextResponse.json({ success: true, cartId });
}
