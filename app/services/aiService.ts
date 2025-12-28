// services/aiService.ts
// Shared service for interacting with OpenAI and Google Gemini

export interface AIServiceResponse {
    success: boolean;
    data?: any;
    error?: string;
    source?: 'OPENAI' | 'GEMINI' | 'NONE';
}

/**
 * Generic function to call available AI services
 */
/**
 * Generic function to call available AI services
 */
export const callAI = async (
    prompt: string,
    jsonResponse: boolean = true,
    imageBase64?: string
): Promise<AIServiceResponse> => {
    const openAiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
    const geminiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

    // 1. Try Gemini (Prioritize for Images as it has native vision support in Flash model)
    if (geminiKey && geminiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
        try {
            console.log('✨ AI Service: Calling Gemini...');

            const parts: any[] = [{ text: prompt + (jsonResponse ? " Return JSON ONLY." : "") }];

            if (imageBase64) {
                // Ensure base64 string is minimal (remove data url prefix if exists)
                const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                parts.push({
                    inline_data: {
                        mime_type: "image/jpeg",
                        data: cleanBase64
                    }
                });
            }

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: parts }]
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || 'Gemini API Error');

            let content = data.candidates[0].content.parts[0].text;
            if (jsonResponse) {
                content = content.replace(/```json/g, '').replace(/```/g, '').trim();
                content = JSON.parse(content);
            }

            return { success: true, data: content, source: 'GEMINI' };
        } catch (e) {
            console.warn('⚠️ Gemini Failed:', e);
        }
    }

    // 2. Try OpenAI
    if (openAiKey && openAiKey !== 'YOUR_OPENAI_API_KEY_HERE') {
        try {
            console.log('🤖 AI Service: Calling OpenAI...');

            const messages: any[] = [{ role: 'user', content: [] }];

            if (imageBase64) {
                messages[0].content.push({ type: "text", text: prompt });
                messages[0].content.push({
                    type: "image_url",
                    image_url: { url: `data:image/jpeg;base64,${imageBase64}` }
                });
            } else {
                messages[0].content = prompt;
            }

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openAiKey}`
                },
                body: JSON.stringify({
                    model: imageBase64 ? 'gpt-4o' : 'gpt-3.5-turbo',
                    messages: messages,
                    temperature: 0.1,
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || 'OpenAI Error');

            let content = data.choices[0].message.content;
            if (jsonResponse) {
                content = content.replace(/```json/g, '').replace(/```/g, '').trim();
                content = JSON.parse(content);
            }

            return { success: true, data: content, source: 'OPENAI' };
        } catch (e) {
            console.warn('⚠️ OpenAI Failed:', e);
        }
    }

    return { success: false, source: 'NONE' };
};
