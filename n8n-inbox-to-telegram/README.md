# n8n: inbox to Telegram (urgent) + Google Sheet (the rest)

From the [@botirjon_swe](https://www.instagram.com/botirjon_swe) reel "I stopped reading my inbox (n8n in 60 seconds)".

```
New email (Gmail) -> AI: summary + urgent? -> IF urgent -> yes: Telegram message to you
                                                        -> no:  new row in a Google Sheet
```

Four steps, no Code node: a trigger, an AI step, a decision, and two outputs.

## What you need

- **n8n.** Self-host the free Community Edition (it's "fair-code" under the Sustainable Use License) or use n8n Cloud
  (paid). Quickest local start: `npx n8n` (needs Node.js), then open http://localhost:5678. Or Docker:
  `docker run -it --rm -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n`.
- **Gmail** account (Google sign-in inside n8n).
- **An OpenAI API key** (pay per use, small for short emails). Any other AI node works too: swap the step and keep
  the same prompt and JSON reply.
- **A Telegram bot** from [@BotFather](https://t.me/BotFather) and your chat id.
- **A Google Sheet** with the columns `Date`, `From`, `Subject`, `Summary` in the first row.

## Set it up (about 15 minutes)

1. In n8n: **Workflows → Import from file** → choose [`inbox-to-telegram.json`](inbox-to-telegram.json).
2. Open each node and pick or create its credential:
   - **New email (Gmail):** sign in with Google. It checks every 5 minutes (change it in Poll Times).
   - **AI: summary + urgent?:** add your OpenAI key. Model: `gpt-4o-mini` (pick another from the list if you like).
   - **Telegram: ping me:** paste your bot token, and replace `YOUR_TELEGRAM_CHAT_ID` with your chat id
     (send your bot a message, then open `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id`).
   - **Google Sheet: log the rest:** sign in with Google, pick your sheet and tab.
3. Click **Execute workflow** and send yourself a test email: one urgent ("server is down, call me before 3 pm") and
   one boring (a newsletter). The first should ping Telegram, the second should add a row.
4. Switch the workflow to **Active**.

## Honest notes

- **The AI can get "urgent" wrong.** Edit the prompt in the AI step to say what urgent means for you.
- **Your machine has to stay on** for a self-hosted n8n to check Gmail. For 24/7, run it on a small server or use
  n8n Cloud.
- **Privacy:** email text is sent to the AI provider. Don't run it on mail you're not allowed to share.
- Never paste API keys or tokens into the workflow file or a public repo: keep them in n8n credentials.

## Learn more

- n8n docs: https://docs.n8n.io
- Gmail Trigger: https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.gmailtrigger/
- Telegram node: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram/

---
YouTube: https://www.youtube.com/@mrbicode · Instagram: https://www.instagram.com/botirjon_swe · Telegram: https://t.me/botirjon_log
