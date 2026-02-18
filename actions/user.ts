import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function requireUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Check if user exists
  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // If not, create it
  if (!user) {
    const clerkUser = await currentUser();

    const primaryEmail = clerkUser?.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

    user = await prisma.user.create({
      data: {
        id: userId,
        email: primaryEmail!,
        createdAt: new Date(),
        
      },
    });
  }

  return user;
}
