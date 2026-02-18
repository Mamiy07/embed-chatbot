"use server"
import { prisma } from "@/lib/prisma";
import { requireUser } from "./user";

export async function createBusiness({
  businessName,
  supportEmail,
  description,
}: {
  businessName: string;
  supportEmail: string;
  description: string;
}) {
  const user = await requireUser();
  try {
    const settings = await prisma.settings.create({
      data: {
        businessName,
        supportEmail,
        description,
        userId: user.id,
      },
    });
    return settings;
  } catch (error) {
    console.log(error);
  }
}
