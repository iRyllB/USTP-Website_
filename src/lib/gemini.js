const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const SYSTEM_PROMPT = `You are a personality decoder for a tech-style personality quiz. The user will give you a 10-letter code.
The first 4 letters define the user's core type, while the last 6 letters define work style traits.
Your job is to interpret and generate a short personality analysis using this format:

Personality Code: {{USER_CODE}}

Core Type:
Title: (based on first 4 letters)
Summary: 4 - 6 sentence description of this core personality in the tech world
Strengths: (list key strengths)
Ideal Work: (roles or activities they'd enjoy most)
Ideal Department for Core team: (Technology (Technology inclined) |Operations (Prefers structure) |Community Development (Loves interacting with people) | Communications (Creative person))
Work Style Traits (Last 6 Letters):
For each letter, briefly explain what it means about the person's way of working.

IMPORTANT: Respond with ONLY valid JSON in this exact format (no additional text):

{
  "personalityCode": "USER_CODE_HERE",
  "coreType": {
    "title": "Title based on first 4 letters",
    "summary": "4-6 sentence description",
    "strengths": ["strength1", "strength2", "strength3"],
    "idealWork": "roles or activities they'd enjoy most",
    "idealDepartment": "Technology or Operations or Community Development or Communications"
  },
  "workStyleTraits": {
    "LETTER1": "Brief explanation",
    "LETTER2": "Brief explanation",
    "LETTER3": "Brief explanation",
    "LETTER4": "Brief explanation",
    "LETTER5": "Brief explanation",
    "LETTER6": "Brief explanation"
  }
}

IMPORTANT: IF THE 10 LETTER COMBINATION IS INVALID, INVALID SEQUENCE AND NOT ON THE QUESTION CHOICES, RESPOND WITH THE FOLLOWING JSON ONLY:
{
  "error": "Invalid personality code"
}
EXAMPLE: EDCFRXSLBF - Take note of the last letter ``F`` the tenth question only has H or K between the choices, therefore this combination is invalid.

For reference:
🧩 Trait Decoder
🎯 Core Personality (First 4 letters)
Code	Title	Description
IDCF	Solo Builder	Independent doer who loves building fast
IDCA	Quiet Creative	Visual and detail-oriented, focused on design and UX
IDSF	Silent Fixer	Calm problem-solver who handles systems and bugs
IDSA	Data Whisperer	Analytical and research-driven, sees patterns
EDCF	Startup Hacker	Fast-paced builder, thrives in chaos
EDCA	Team Designer	Design leader who bridges visual and technical
EDSF	Tech Lead	System thinker who guides teams and ships solid work
EDSA	Visionary Analyst	Sees trends, connects dots, builds insight from data
ITSA	Quiet Analyst	Independent thinker, slow and deep problem-solver

🔧 Work Style Traits (Last 6 letters)
Letter	Trait	Description
R	Repeater	Prefers optimizing existing systems
N	Navigator	Loves solving totally new problems
X	Self-Learner	Trial and error, self-taught, hands-on
Y	Social Learner	Learns better through collaboration or instruction
S	Structured	Works best with plans, schedules, order
F	Flow-Based	Goes with inspiration, flexible with tasks
L	Listener	Quietly keeps the team running smoothly
Z	Driver	Brings energy, leads discussions, pushes forward
B	Step Solver	Solves things one logical piece at a time
V	Visionary Thinker	Starts with the big picture and works downward
H	Hacker	Jumps into tools hands-on and figures it out fast
K	Planner	Studies first, thinks before acting or testing`;

/**
 * Analyzes a personality code using Google Gemini API
 * @param {string} personalityCode - The 10-letter personality code
 * @returns {Promise<Object>} - The personality analysis JSON
 */
export const analyzePersonalityCode = async (personalityCode) => {
    if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key is not configured');
    }

    if (!personalityCode || personalityCode.length !== 10) {
        throw new Error('Invalid personality code. Must be exactly 10 letters.');
    }

    const prompt = `${SYSTEM_PROMPT}\n\nPersonality Code: ${personalityCode.toUpperCase()}`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Gemini API error: ${response.status} ${response.statusText}. ${errorData.error?.message || ''}`);
        }

        const data = await response.json();

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response from Gemini API');
        }

        const generatedText = data.candidates[0].content.parts[0].text;

        // Try to extract JSON from the response
        // First, try to extract from markdown code blocks
        let jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
            jsonMatch[0] = jsonMatch[1]; // Use the content inside the code block
        } else {
            // Fallback: look for JSON object directly
            jsonMatch = generatedText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                // Try to find JSON that might start with array
                jsonMatch = generatedText.match(/\[[\s\S]*\]/);
            }
        }

        if (!jsonMatch) {
            throw new Error(`Could not extract JSON from Gemini response. Response was: ${generatedText.substring(0, 200)}...`);
        }

        let personalityAnalysis;
        try {
            personalityAnalysis = JSON.parse(jsonMatch[0]);
        } catch (parseError) {
            throw new Error(`Failed to parse JSON response: ${parseError.message}`);
        }
        
        // Validate the response structure
        if (!personalityAnalysis.personalityCode || !personalityAnalysis.coreType || !personalityAnalysis.workStyleTraits) {
            throw new Error('Invalid personality analysis structure');
        }

        return personalityAnalysis;

    } catch (error) {
        console.error('Error analyzing personality code:', error);
        throw error;
    }
};

/**
 * Validates if a personality code follows the expected format
 * @param {string} code - The personality code to validate
 * @returns {boolean} - Whether the code is valid
 */
export const isValidPersonalityCode = (code) => {
    if (!code || typeof code !== 'string' || code.length !== 10) {
        return false;
    }

    // Check if all characters are letters
    return /^[A-Za-z]{10}$/.test(code);
};
