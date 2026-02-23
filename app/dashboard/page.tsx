import { requireUser } from "@/actions/user";
import Chatbots from "@/components/global/chatbots";
import EmbedButton from "@/components/global/create-embedai";
import { UserButton } from "@clerk/nextjs";
const Page = async () => {
  const user = await requireUser();
  
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl ">EmbedAI</h1>
        <div className="flex items-center gap-4 px-4">
          <EmbedButton /> 
            <UserButton/>
        </div>
      </div>
      <div className="flex my-10 ">
        <Chatbots/>

      </div>
    </div>
  );
};

export default Page;
