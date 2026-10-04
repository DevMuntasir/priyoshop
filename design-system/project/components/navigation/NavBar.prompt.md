The PriyoShop site header — a floating white pill with the logo, a centered text menu, a Contact link and a Join Us button.

```jsx
<NavBar
  active="About"
  onNavigate={(label) => goTo(label)}
  onCta={() => openJoin()}
/>
```

Set `floating={false}` for a flush full-width bar. Provide `items`, `cta`, `secondary` to customise.
