# 8 checks before you deploy your AI-built app

Your AI tool wrote the code. Before you deploy, go through these. Each check comes with a way to test it yourself.

From the [@botirjon_swe](https://www.instagram.com/botirjon_swe) reel "8 checks before you deploy your AI-built app".

| # | Check | Test it yourself |
|---|---|---|
| 1 | **Secrets live in env variables, never in code.** `.env` is in `.gitignore`. If a key was *ever* committed, rotate it: git history keeps it. | `git log -p \| grep -iE "api_key\|secret\|sk_"`. Anything found means you need to rotate that key. |
| 2 | **Passwords are hashed** with scrypt, bcrypt or Argon2, with a salt. Never plain text, never MD5/SHA-1. | Look at your users table. If you can read a password, it's broken. |
| 3 | **Session cookies are `HttpOnly`, `Secure`, `SameSite=Lax` (or `Strict`).** | DevTools → Application → Cookies. All three columns must be ticked. `document.cookie` in the console must *not* show the session. |
| 4 | **Every query checks who owns the data** (IDOR). Never trust an id from the URL or body alone. | Log in, open `/orders/41`, change it to `/orders/42`. If you see someone else's order, you're leaking. |
| 5 | **Validate input on the server and use parameterized queries.** Client-side validation is UX, not security. | Send `' OR 1=1 --` in a form field (or with curl, skipping the frontend). It must be stored or rejected as plain text, never change the query. |
| 6 | **Rate limit login, signup and password reset.** | Hit login 20 times in a few seconds. You should get `429 Too Many Requests`. |
| 7 | **Verify the signature on payment webhooks** (Stripe `constructEvent`, etc.) before you trust the event. | POST a fake "payment succeeded" JSON to your webhook URL with no signature. It must be rejected. |
| 8 | **Backups exist, and you've restored one.** | Restore last night's backup into a fresh database once. If you never have, you don't really have backups. |

## Bonus quick wins

- HTTPS everywhere, HSTS on.
- Error pages don't show stack traces in production.
- Admin routes check the role on the server, not just hide the button.
- Dependencies: `npm audit` before launch.
- Logs never contain passwords, tokens or full card data.

## Check #2 in real code (Node, no packages)

```js
const c = require("node:crypto");
const pw = "hunter2";
const salt = c.randomBytes(16);
const hash = c.scryptSync(pw, salt, 64);
// save salt + hash. Never pw.
const input = "hunter2";
const ok = c.timingSafeEqual(hash,
  c.scryptSync(input, salt, 64));
console.log(ok); // true
```

Run it with `node hash.js`. It prints `true`. Store `salt` and `hash` for each user. At login, hash the typed password with the same salt and compare with `timingSafeEqual`.

---
YouTube: https://www.youtube.com/@mrbicode · Instagram: https://www.instagram.com/botirjon_swe · Telegram: https://t.me/botirjon_log
