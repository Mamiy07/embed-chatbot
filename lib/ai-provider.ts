import { GoogleGenAI } from "@google/genai";
import { OpenAI } from "openai";
import Anthropic from "@anthropic-ai/sdk";
type props = {
    model : string,
    content : string,
    aiProvider : string,
    encryptedApiKey : string
}

export const generateAIResponse = async ({model, content, aiProvider, encryptedApiKey}: props)=>{

   if(aiProvider === 'gemini') { 
  const ai = new GoogleGenAI({apiKey: encryptedApiKey});
    const response = await ai.models.generateContent({
        model: model,
        contents: content,
      });
      return response.text
   }if(aiProvider === 'openai'){
    const client = new OpenAI({apiKey: encryptedApiKey});
    const response = await client.responses.create({
    model: model,
    input: content
});
return response.output_text
   }if(aiProvider === 'claude'){
       const anthropic = new Anthropic({apiKey: encryptedApiKey});
       const msg = await anthropic.messages.create({
    model: model,
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: content
      }
    ]
  });
      console.log(msg)
   }


}