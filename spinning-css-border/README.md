# Spinning gradient border, pure CSS

A button whose gradient border spins forever, with zero JavaScript.

**Open `index.html` in a browser.** That's all.

## How it works

```css
@property --a {          /* tells the browser --a is an angle, so it can animate it */
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
.btn {
  border: 3px solid transparent;
  background:
    linear-gradient(#0B0F1A, #0B0F1A) padding-box,                         /* the inside */
    conic-gradient(from var(--a), #22D3EE, #A855F7, #22D3EE) border-box;   /* the border */
  animation: spin 2s linear infinite;
}
@keyframes spin { to { --a: 360deg; } }
```

- The border is a `conic-gradient` painted on the `border-box`, covered inside by a solid `padding-box` layer.
- The animation turns the gradient's start angle `--a` from 0 to 360deg.
- **Delete the `@property` block and it stops spinning**: without it the browser doesn't know `--a` is an angle,
  so it can't animate between values (it just jumps).

Works in current Chrome, Edge, Safari and Firefox (128+).

From the Reel / Short by [@botirjon_swe](https://www.instagram.com/botirjon_swe).
