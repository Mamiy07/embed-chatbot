import { requireUser } from "@/actions/user";

const Page = async () => {

  const user = await requireUser();
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Page
