import { GoogleGenAI, Type } from "@google/genai";
import { AIPlanningResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateShootPlan = async (
  shootType: string,
  location: string,
  details: string
): Promise<AIPlanningResponse | null> => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing");
    return null;
  }

  try {
    const prompt = `
      Sen Nevşehir ve Kapadokya bölgesinde uzmanlaşmış profesyonel bir drone operatörü ve görüntü yönetmenisin.
      Kullanıcı şu çekim için tavsiye istiyor:
      - Tür: ${shootType}
      - Konum: ${location}
      - Detaylar: ${details}

      Lütfen bu çekim için yaratıcı ve teknik bir plan oluştur.
      Yanıtını JSON formatında ver.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestion: {
              type: Type.STRING,
              description: "Yaratıcı çekim önerileri ve kompozisyon fikirleri.",
            },
            technicalTips: {
              type: Type.STRING,
              description: "Önerilen drone hareketleri (orbit, reveal, tracking) ve kamera ayarları.",
            },
            bestTime: {
              type: Type.STRING,
              description: "Işık için günün en iyi saati.",
            },
          },
          required: ["suggestion", "technicalTips", "bestTime"],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) return null;

    return JSON.parse(responseText) as AIPlanningResponse;
  } catch (error) {
    console.error("Gemini AI generation failed:", error);
    return null;
  }
};