# What is a harness? Start with Claude Code in 10 minutes

From the [@botirjon_swe](https://www.instagram.com/botirjon_swe) reel "Same AI, but smarter in Claude Code: what's a harness?".

## The idea in one picture

- **The model is the brain.** On its own it can only read text and write text.
- **The harness is the body around it.** It gives the model:
  - **Hands:** tools to read files, edit them and run commands.
  - **Memory:** a notes file about your project (`CLAUDE.md`) that it reads at the start of every session.
  - **Rules:** permission modes that decide what it may do without asking you.
  - **A loop:** try, check the result (run the tests, read the error), fix, repeat.

That's why the same model gives you code to copy in a chat but fixes the bug itself in a harness: the harness can run
the code and see what broke. Claude Code, Cursor's agent mode and OpenAI's Codex CLI are all harnesses.

## 1. Install (no admin needed)

You need a Claude subscription (Pro or higher) or a Claude Console (API) account.

macOS, Linux, WSL:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Open a **new** terminal and check: `claude --version`. If `claude` isn't found, see
[Fix your PATH](https://code.claude.com/docs/en/troubleshoot-install).

## 2. Start it in a project

```bash
cd path/to/your/project
claude
```

The first run opens your browser to log in.

## 3. Give it memory: `/init`

Type `/init`. Claude reads the project and writes a starting `CLAUDE.md` with build commands, test commands and
conventions. Edit it and add what it can't guess ("we use pnpm", "never touch the payments folder"). It's read at the
start of every session. It's guidance, not a lock.

## 4. Your first prompt

Ask for something you can check:

> Run the tests. If any fail, find the cause, fix it, and run them again until they pass. Explain what you changed.

Watch the loop happen: it runs the tests, reads the error, edits the file, runs them again.

## 5. Know the rules (permission modes)

Press **Shift+Tab** to switch modes:

| Mode | What it does without asking you |
|---|---|
| Manual (`default`) | Only reads. It asks before editing files or running commands |
| Accept edits | Reads and edits files, asks before other commands |
| Plan | Explores and plans, makes no changes |
| Auto | Most actions, with a second model checking each one in the background |

New project or sensitive code: start in Manual or Plan. Newer versions start in Auto by default; check the mode shown
at the bottom of the screen.

## 6. Stay the reviewer

- Read the diff before you commit (`git diff`). It can be confidently wrong.
- Use git, so any change is one `git checkout` away from undone.
- Keep secrets in `.env`, never paste keys into the chat.

## Learn more

- Docs: https://code.claude.com/docs
- Quickstart: https://code.claude.com/docs/en/quickstart
- Memory and CLAUDE.md: https://code.claude.com/docs/en/memory
- Permission modes: https://code.claude.com/docs/en/permission-modes

---
YouTube: https://www.youtube.com/@mrbicode · Instagram: https://www.instagram.com/botirjon_swe · Telegram: https://t.me/botirjon_log
