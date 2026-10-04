Pill-shaped button in Open Sans SemiBold — the workhorse action across PriyoShop. Black `filled/dark` is the primary CTA; `outlined/dark` is the common secondary.

```jsx
<Button>Join Us</Button>
<Button variant="outlined" iconRight={<PlayIcon />}>Watch Our Story</Button>
<Button variant="ghost" size="sm">Learn More</Button>
<Button tone="light" variant="outlined">Contact Us</Button>   {/* on dark/photo */}
<Button tone="brand">Download App</Button>                    {/* red emphasis */}
```

Variants: `filled · outlined · ghost`. Tones: `dark · light · brand`. Sizes: `sm 32 · md 40 · lg 56`.
Pass `iconLeft` / `iconRight` (24px box), `fullWidth`, `href`, `disabled`.
