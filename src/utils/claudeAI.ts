export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export async function sendMessageToClaude(
  userMessage: string,
  cvData: string,
  conversationHistory: Message[] = []
): Promise<string> {
  if (!CLAUDE_API_KEY) {
    throw new Error('Claude API key not configured. Please add VITE_CLAUDE_API_KEY to your environment variables.');
  }

  // Build the system prompt with CV context
  const systemPrompt = `You are an AI assistant representing Tude Arya Asmadijaya, an IT Support Specialist with expertise in:
- Multi-site hospitality and F&B operations
- Network infrastructure and MikroTik RouterOS
- Mobile Device Management (MDM)
- CCTV systems (DVR/NVR)
- POS systems (ESB FnB)
- Fiber-optic networks (FTTH)
- IT incident management and system administration

You have access to the professional CV/background information below. Answer questions about the professional's experience, skills, and projects based on this information. Be conversational, detailed, and professional.

---
PROFESSIONAL BACKGROUND:
${cvData}
---

Provide accurate, detailed responses based on the CV information. If asked about something not in the CV, politely indicate that information isn't available in the provided background.`;

  // Build the messages array
  const messages: Message[] = [
    ...conversationHistory,
    { role: 'user', content: userMessage },
  ];

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Claude API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = (await response.json()) as ClaudeResponse;
    const assistantMessage = data.content[0]?.text || 'Unable to generate response';

    return assistantMessage;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}
