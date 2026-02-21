"use server"
import { prisma } from "@/lib/prisma";
import { requireUser } from "./user";
import { encrypt } from "@/lib/encryption";

export async function createBusiness({
  businessName,
  supportEmail,
  description,
  aiProvider,
  encryptedApiKey,
  model
}: {
  businessName: string;
  supportEmail: string;
  description: string;
  aiProvider: string;
  encryptedApiKey: string;
  model: string;
}) {
  const user = await requireUser();
  const safeApiKey = encrypt(encryptedApiKey)
  try {
    const settings = await prisma.settings.create({
      data: {
        businessName,
        supportEmail,
        description,
        aiProvider,
        encryptedApiKey: safeApiKey,
        model,
        userId: user.id,
      },
    });
    return settings;
  } catch (error) {
    console.log(error);
  }
}
