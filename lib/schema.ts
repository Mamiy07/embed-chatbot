import { z } from "zod";

export const businessSchema = z.object({    
  businessName: z.string().min(4, "Business name must be at least 4 characters"),
  supportEmail: z.string().email("Enter a valid email address"),
  aiProvider: z.string().min(1, "Please select an AI provider"),
  model: z.string().min(1, "Please select a model"),
  apiKey: z.string().min(10, "API key must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 20 characters"),
})