const c = require("node:crypto");
const pw = "hunter2";
const salt = c.randomBytes(16);
const hash = c.scryptSync(pw, salt, 64);
// save salt + hash. Never pw.
const input = "hunter2";
const ok = c.timingSafeEqual(hash,
  c.scryptSync(input, salt, 64));
console.log(ok); // true
