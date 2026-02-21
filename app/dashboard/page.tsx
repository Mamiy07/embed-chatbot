import { requireUser } from "@/actions/user";
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
    </div>
  );
};
//make each business owner hav their own api key 
// save api key in db make sure to encrypt it and decrypt it when needed.
// 

export default Page;
