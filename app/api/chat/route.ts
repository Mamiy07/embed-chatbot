import { generateAIResponse } from "@/lib/ai-provider";
import { decrypt } from "@/lib/encryption";
import { prisma } from "@/lib/prisma";
import { he } from "date-fns/locale";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS(request: NextRequest) {

  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
export async function POST(request: NextRequest) {
  
    try {
        const {message, businessId} = await request.json()
        if(!message || !businessId) {
            return new Response('Message and businessId are required', {status: 400})
        }
        const settings = await prisma.settings.findUnique({
            where: {
                id: businessId
            }})
        if(!settings) {
            return new Response('Business not found', {status: 404})
        }
         
        const description = `
         Business Name: ${settings.businessName}
         Support Email: ${settings.supportEmail}
         Description: ${settings.description} 
        `
          const safeMessage = message.toString().slice(0, 2000);
    const decryptedKey = decrypt(settings.encryptedApiKey)

       const prompt = `
You are an embeddable customer support chatbot.

You must answer the customer's question using ONLY the provided Business Information below.

------------------------
Business Information:
${description}
------------------------

Customer Question:
${safeMessage}
------------------------

Rules:

If the question is unrelated to the Business Information, or required details are missing, respond exactly with:

Please Contact support

However:
- You may respond politely to greetings.
- You may ask the customer to clarify if their question is vague.

1. Use ONLY the Business Information provided above.
2. You may rephrase or summarize the information if needed.
3. Do NOT add any information that is not explicitly written.
4. Do NOT invent:
   - Prices
   - Policies
   - Features
   - Timelines
   - Guarantees
   - Refund terms
   - Any additional details not mentioned
5. Do NOT assume missing information.
6. Do NOT make promises.
7. Do NOT guess.
8. Do NOT answer using general knowledge.

If the Customer Question:
- Is not clearly answered in the Business Information
- Is partially related but missing required details
- Requires assumptions
- Is completely unrelated

You MUST respond exactly with:

Please Contact support

Do not add anything before or after that sentence.

When answering:

- Be clear and professional
- Keep the response concise
- Always refer back to the Business Information
- Keep in mind that the customer may have limited understanding of the business details, so clarity is important.
- Keep the answer short and to the point, ideally under 100 words.
- Only use facts explicitly stated in the Business Information
 `;

  const response = await generateAIResponse({
    model: settings.model,
    content: prompt,
    aiProvider: settings.aiProvider,
    encryptedApiKey: decryptedKey
  })

  return NextResponse.json({answer: response },{status: 200, headers: {"Access-Control-Allow-Origin": "*"}})
 
    } catch (error) {
        console.error(error)       
         return new Response('Internal Server Error', {status: 500})
    }

}