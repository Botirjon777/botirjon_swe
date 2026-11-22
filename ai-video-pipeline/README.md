# How Claude made this video: the whole pipeline

From the [@botirjon_swe](https://www.instagram.com/botirjon_swe) reel "Claude made this video". Every tool, what it does in the
pipeline, and its licence. It all runs on one Windows PC, driven from one chat.

It's **mostly free**: you need a Claude subscription (or API credits) and a PC. A person still picks the idea, approves
the plan and watches the video before it posts. It's not one click.

| Step | Tool | What it does here | Licence / cost |
|---|---|---|---|
| 0. The driver | [Claude Code](https://www.claude.com/product/claude-code) | Claude with hands: it runs every program below from one chat, writes the script and the animation code, and checks the results | Paid: Claude subscription or API |
| 1. Script | Claude (inside Claude Code) | Writes the script from an idea: hook, steps, one call to action | (same) |
| 2. Voice | [Chatterbox](https://github.com/resemble-ai/chatterbox) by Resemble AI | Open-source text-to-speech, runs locally on the graphics card; can copy a voice from a short sample (only use your own voice, or someone's with their consent) | MIT, free |
| 3. Animation | [Remotion](https://github.com/remotion-dev/remotion) | Videos written as React code; renders every frame with a headless browser | Free for individuals and companies of up to 3 people ([licence](https://www.remotion.dev/license)) |
| 4. Captions | [faster-whisper](https://github.com/SYSTRAN/faster-whisper) | Listens to the voice and times every word, so the captions land exactly | MIT, free |
| 5. Sound | [Freesound](https://freesound.org) (CC0 filter) + [FFmpeg](https://ffmpeg.org) | Real recorded sound effects and a music bed under the CC0 licence; FFmpeg mixes voice, effects and music and sets the loudness (-14 LUFS for Instagram/YouTube) | CC0 sounds: free, no credit needed. FFmpeg: LGPL/GPL, free |
| 6. Posting | [Postiz](https://github.com/gitroomhq/postiz-app) | Open-source social media scheduler, self-hosted in Docker; posts the video to Instagram and YouTube | AGPL-3.0, free when self-hosted |

## The flow

```
idea -> Claude writes script.txt
     -> Chatterbox: script.txt -> voiceover.wav
     -> faster-whisper: voiceover.wav -> word timings (captions)
     -> Claude writes the Remotion composition, timed to the words
     -> Remotion renders the video (no sound)
     -> FFmpeg mixes voice + CC0 effects + music, loudness -14 LUFS
     -> a person watches it
     -> Postiz schedules it on Instagram and YouTube
```

## Start small

1. Install [Claude Code](https://code.claude.com/docs) and open an empty folder.
2. `npx create-video@latest` (Remotion) and ask Claude: "make a 10-second title animation that says hello".
3. Add a voice: install Chatterbox (`pip install chatterbox-tts`) and ask Claude to voice one sentence.
4. Add captions with faster-whisper (`pip install faster-whisper`), then ask Claude to show each word as it's spoken.

Music in this video: "Good vibe background music" by Seth_Makes_Sounds ([Freesound 661782](https://freesound.org/s/661782/), CC0).

Claw'd, the orange pixel character in the video, is Anthropic's Claude Code mascot, used here as fan art. This is not
official Anthropic content.

---
YouTube: https://www.youtube.com/@mrbicode · Instagram: https://www.instagram.com/botirjon_swe · Telegram: https://t.me/botirjon_log
