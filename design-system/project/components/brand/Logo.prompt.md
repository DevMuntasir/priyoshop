The PriyoShop master logo — wordmark plus the red bag-and-heart mark, recreated from the brand vector so it recolours cleanly.

```jsx
<Logo width={160} />                {/* ink wordmark on light surfaces */}
<Logo width={160} tone="light" />   {/* white wordmark on dark/photo surfaces */}
<Logo mark width={36} />            {/* bag glyph only — favicons, avatars, tight nav */}
```

Notes
- Brand red is fixed (`--ps-red-500`, #EE2F47); only the wordmark/handle ink flips with `tone`.
- Always give it clear space ≥ the bag's width on every side. Never restretch — pass `width` and the height follows.
