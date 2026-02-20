import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
export async function POST(request: NextRequest) {
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

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
- Only use facts explicitly stated in the Business Information
 `;

const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
 

  return NextResponse.json({answer: response.text },{status: 200})
 
    } catch (error) {
        console.error(error)       
         return new Response('Internal Server Error', {status: 500})
    }

}