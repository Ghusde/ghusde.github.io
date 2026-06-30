# Claude AI Integration Setup Guide

## Overview
The "Ask Me" page is now integrated with Claude AI to provide intelligent, context-aware responses about your professional experience, projects, and expertise.

## Setup Steps

### 1. Get Claude API Key
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to the API keys section
4. Create a new API key
5. Copy your API key

### 2. Configure Environment Variable
1. Open or create the `.env.local` file in your project root
2. Add your API key:
   ```
   VITE_CLAUDE_API_KEY=your_api_key_here
   ```
3. Replace `your_api_key_here` with your actual Claude API key
4. **Important**: Never commit `.env.local` to version control. It's already in `.gitignore`

### 3. Update CV Data (Optional)
The CV data is stored in `src/data/cv.ts`. You can customize it with your own information:

1. Open `src/data/cv.ts`
2. Replace the `cvData` string with your ATS-formatted CV
3. The format should include:
   - Professional summary
   - Technical skills
   - Work experience
   - Projects
   - Education
   - Certifications
   - Languages

### 4. Start Development Server
```bash
npm run dev
```

## How It Works

### Frontend
- User submits a question through the chat interface
- Question is sent to Claude API with conversation history
- Claude receives the system prompt containing your CV as context
- Response is displayed in the chat

### System Prompt
Claude is configured with a system prompt that:
1. Identifies Claude as your personal AI assistant
2. Provides your CV as context
3. Instructs Claude to answer based on your professional background
4. Handles questions about topics not in your CV gracefully

### Conversation Memory
- The entire conversation history is maintained
- Each new question includes previous messages
- Claude can reference earlier parts of the conversation

## Features

✅ **AI-Powered Responses** - Intelligent answers based on your CV  
✅ **Conversation History** - Context-aware responses  
✅ **Error Handling** - User-friendly error messages  
✅ **Loading States** - Visual feedback while processing  
✅ **Dark Mode Support** - Works in light and dark themes  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Multi-language** - Supports English and Indonesian  
✅ **Suggested Questions** - Quick-start example questions  

## Customization

### Change Model
In `src/utils/claudeAI.ts`, change the `model` parameter:
```typescript
model: 'claude-3-5-sonnet-20241022', // Change this
```

Available models:
- `claude-3-5-sonnet-20241022` (Latest, recommended)
- `claude-3-opus-20250219`
- `claude-3-haiku-20250307`

### Adjust Response Length
Change `max_tokens` in `src/utils/claudeAI.ts`:
```typescript
max_tokens: 1024, // Increase for longer responses
```

### Add More Suggested Questions
Edit `suggestedQuestions` in `src/pages/AskMe.tsx`:
```typescript
const suggestedQuestions = {
  en: [
    'Your new question?',
    // ... more questions
  ],
  id: [
    'Pertanyaan baru Anda?',
    // ... lebih banyak pertanyaan
  ],
};
```

## Pricing

Claude API uses pay-as-you-go pricing. Check current rates at [Anthropic Pricing](https://www.anthropic.com/pricing/claude).

Typical cost per conversation:
- Small questions: $0.001 - $0.005
- Detailed questions: $0.005 - $0.02

## Troubleshooting

### "API key not configured" Error
- Make sure `.env.local` file exists in project root
- Check `VITE_CLAUDE_API_KEY` is set correctly
- Restart development server after adding `.env.local`

### "API error" Messages
- Verify your API key is valid
- Check your Anthropic account has remaining credits
- Review error message in console for details

### Slow Responses
- Normal Claude response time is 2-5 seconds
- Check your internet connection
- Verify API rate limits haven't been exceeded

## Security Notes

⚠️ **Important**:
- Never expose your API key in frontend code
- Keep `.env.local` in `.gitignore` (already configured)
- For production, use environment variables through your hosting provider
- Consider rate limiting on the backend if deploying

## Example CV Format

```
JOHN DOE
Senior IT Engineer

PROFESSIONAL SUMMARY
10+ years of IT experience...

TECHNICAL SKILLS
- Networking: Cisco, MikroTik
- Cloud: AWS, Azure
- Security: Firewalls, VPN

EXPERIENCE
Company Name (2020-Present)
- Achievement 1
- Achievement 2

EDUCATION
Bachelor of Computer Science
```

## API Documentation

For more details about the Claude API, visit:
- [Anthropic Documentation](https://docs.anthropic.com/)
- [API Reference](https://docs.anthropic.com/resources/getting-started-with-the-api)

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify `.env.local` configuration
3. Ensure API key is valid and has available credits
4. Review Anthropic documentation
