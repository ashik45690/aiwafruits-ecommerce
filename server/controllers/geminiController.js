 import { GoogleGenAI } from "@google/genai";


 const Geminiai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
 })
 
 export async function geminiController(req ,res) {
    
    const {productname} =  req.body ;

    if (!productname?.trim()) {
        
        console.log('productname not found for Ai description');
        return ;
    }

    try {

            const prompt = `
You are an expert e-commerce product copywriter.

Generate a short, attractive and professional product description for this fruit product:

Product Name: ${productname}

Requirements:
- Write 2 to 3 sentences only
- Keep it suitable for an online fruit store
- Make it appealing to customers
- Mention natural taste, freshness or quality when appropriate
- Do not use emojis
- Do not add headings
- Return only the description
`;


const response = await Geminiai.models.generateContent({
    model:'gemini-2.5-flash',
    contents: prompt
})

  const des = response.text?.trim();
  
   if (!des) {
      return res.json({
        success: false,
        message: "Failed to generate description",
      });
    }

    return res.json({
      success: true,
      des,
    });
        
    } catch (error) {
        console.log(error);

        return res.json({
      success: false,
      message: "Failed to generate product description",
    });
        
    }
 }