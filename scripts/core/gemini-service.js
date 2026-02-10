/**
 * 🤖 GEMINI SERVICE
 * AI Content Generation for Omni-System
 */

class GeminiService {
  static ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  static get apiKey() {
    return game.settings.get('omini-system', 'gemini_api_key');
  }

  /**
   * Generate content using Gemini API
   * @param {string} prompt 
   * @returns {Promise<string>}
   */
  static async generate(prompt) {
    const key = GeminiService.apiKey;
    if (!key) {
      console.warn("[GEMINI] No API Key found.");
      return null;
    }

    try {
      const response = await fetch(`${GeminiService.ENDPOINT}?key=${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      return text;

    } catch (error) {
      console.error("[GEMINI] Generation failed:", error);
      ui.notifications.error("Gemini AI: Falha na geração de conteúdo.");
      return null;
    }
  }

  /**
   * Generate Fusion Flavor Text
   * @param {Object} context 
   */
  static async generateFusionFlavor(context) {
    const prompt = `
      You are a creative writer for a Manhwa-style VRMMORPG (Solo Leveling style).
      
      Generate a legendary item name and lore description for a fusion of the following items:
      - Item 1: ${context.item1}
      - Item 2: ${context.item2}
      
      Output ONLY a JSON object with keys: "name", "description", "lore".
      Language: Portuguese (Brazil).
    `;

    const result = await GeminiService.generate(prompt);
    if (!result) return null;

    try {
        // Extract JSON from code block if present
        const jsonMatch = result.match(/```json\n([\s\S]*?)\n```/) || [null, result];
        const jsonStr = jsonMatch[1] || result;
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("[GEMINI] JSON Parse error", e);
        return null;
    }
  }
}

// Attach to OmniCore
Hooks.once('ready', () => {
    if (window.OmniCore) {
        window.OmniCore.ai = GeminiService;
    }
});
