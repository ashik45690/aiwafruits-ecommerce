import api from "./api";

export async function GeminiService(productname) {
    const response = await api.post('/gemini-auto-description-maker',{
        productname
    })

    return response
}