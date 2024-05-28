"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const configuration = await db.configuration.findUnique({
    where: {
      id: configId,
    },
  });

  if (!configuration) {
    throw new Error("Configuration not found");
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const { finish, material } = configuration;

  let price = BASE_PRICE;

  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;

  
};
