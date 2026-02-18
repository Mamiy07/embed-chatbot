

import { requireUser } from "@/actions/user";
import { SignOutButton } from "@clerk/nextjs";
const Page = async () => {
  const user = await requireUser();
  return (
    <div>
      <h1>Dashboard</h1>
      <SignOutButton/>
      
    </div>
  )
}

export default Page
