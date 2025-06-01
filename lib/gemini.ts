// lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function classifyRequest(text: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

 const prompt = `
You are a support assistant helping classify and summarize user queries.

Given the following request, perform the following tasks:

1. Classify the request into **one of the following 20 categories**:
   - Technical
   - Billing
   - General
   - Other
   - Account Access
   - Login Issues
   - Password Reset
   - Payment Failure
   - Refund Request
   - Subscription Changes
   - Feature Request
   - Bug Report
   - Feedback
   - Cancellation Request
   - Service Downtime
   - API Support
   - Data Privacy
   - Integration Help
   - Upgrade Plan
   - Mobile App Issue

2. Generate a **short, descriptive heading** for the query (max 8 words).

3. Summarize the request into **three concise bullet points** written in **third person**, avoiding "I" or "me". Use active voice and formal tone.

Return only a valid JSON in the following format:

{
  "heading": "Short summary of the issue",
  "category": "One of the 20 categories above",
  "summary": [
    "Point one in third person",
    "Point two in third person",
    "Point three in third person"
  ]
}

User Request:
"""
${text}
"""
`.trim();


  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const raw = await response.text();

    // Extract JSON safely using regex
    const match = raw.match(/\{[\s\S]*?\}/);
    if (!match) throw new Error("No JSON found in response");

    const json = JSON.parse(match[0]);

    return {
      heading: json.heading || 'Untitled Request',
      category: json.category || 'Other',
    };
  } catch (error) {
    console.error('Gemini classification error:', error);
    return {
      heading: 'Uncategorized Request',
      category: 'Other',
    };
  }
}
