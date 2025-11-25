import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, AIPlanningResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const chatWithAI = async (
  history: ChatMessage[],
  newMessage: string,
  contextData: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Anahtarı eksik. Lütfen site yöneticisiyle iletişime geçin.";
  }

  try {
    const systemInstruction = `
      Sen 'Drone Çekimi Nevşehir' firmasının yapay zeka asistanısın.
      Adın: Asistan.
      Görevin: Web sitesini ziyaret eden potansiyel müşterilerin sorularını yanıtlamak ve onları hizmet almaya ikna etmek.
      
      Şu kurallara uy:
      1. Çok teknik terimler (ISO, diyafram, bitrate) kullanma. Müşterinin anlayacağı dilden konuş (Örn: "Sinematik görüntü", "4K netlik").
      2. Kibar, profesyonel ama samimi ol. Kapadokya'nın misafirperverliğini yansıt.
      3. Fiyat sorulursa net rakam verme. "Projeye, lokasyona ve süreye göre fiyatlarımız değişmektedir. En doğru teklif için lütfen aşağıdaki iletişim formunu doldurun veya bizi arayın." de.
      4. Şu bilgileri referans al: ${contextData}
      5. Cevapların kısa ve net olsun (maksimum 2-3 cümle).
    `;

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Üzgünüm, bir hata oluştu.";

  } catch (error) {
    console.error("Gemini AI chat failed:", error);
    return "Şu an bağlantıda bir sorun yaşıyorum. Lütfen iletişim bölümünden bize ulaşın.";
  }
};

export const generateShootPlan = async (
  shootType: string,
  location: string,
  details: string
): Promise<AIPlanningResponse | null> => {
  if (!process.env.API_KEY) {
    console.error("API Key missing");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Profesyonel bir drone operasyon planı oluştur.
      
      Çekim Türü: ${shootType}
      Lokasyon: ${location}
      Detaylar: ${details}
      
      Lütfen yanıtı Türkçe hazırla.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestion: {
              type: Type.STRING,
              description: "Yaratıcı çekim önerileri ve kompozisyon fikirleri (kısa paragraf)"
            },
            technicalTips: {
              type: Type.STRING,
              description: "Önerilen kamera ayarları (ND filtre, FPS, shutter, ISO vb.)"
            },
            bestTime: {
              type: Type.STRING,
              description: "Tahmini en iyi ışık saati (örn: Altın Saat - 18:30)"
            }
          },
          required: ["suggestion", "technicalTips", "bestTime"]
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as AIPlanningResponse;
    }
    return null;

  } catch (error) {
    console.error("Gemini AI plan generation failed:", error);
    return null;
  }
};
