# HOT Design System — component library

React components mirroring the **HOT Design System** Figma file
(`NH9zVKuqGYXraKuomW7niY`). Styled only with CSS variables (tokens) defined in
`src/index.css`. Import from the barrel:

```js
import { Button, Input } from '../design-system';
```

## Figma → code component map
Used when converting a Figma frame to code — match the Figma component/variant
to the React component below (we don't have Code Connect, so this table is the
mapping source of truth).

| Figma page / component | Variants (Figma props)                          | React component | Props |
|------------------------|-------------------------------------------------|-----------------|-------|
| Button (`93:829`)      | Type, Size, State, Icon                         | `<Button>`      | `variant`, `size`, `iconLeft/iconRight/iconOnly` |
| Input Fields → Text Input (`6854:3834`) | Size, State, Type               | `<Input>`       | `label`, `size`, `error`, `prefix/suffix`, `required`, `helperText` |

## Button
`variant`: `primary` \| `secondary` \| `filled` \| `ghost` \| `error` \| `neutral`
`size`: `xs` (28px) \| `sm` (32px) \| `md` (40px, default)
Icons: `iconLeft`, `iconRight`, or `iconOnly` (square).
States (hover/active/disabled) are automatic via CSS.

```jsx
<Button variant="primary">Save</Button>
<Button variant="secondary" size="sm" iconLeft={<Icon name="add" />}>New</Button>
<Button variant="error">Delete</Button>
<Button variant="ghost" iconOnly><Icon name="close" /></Button>
```

Figma `Type=Danger` maps to `variant="error"`. The Link/Secondary trial frames
are not reproduced (folded into `secondary`/`ghost`).

## Input
`size`: `sm` (32px) \| `md` (40px, default). `error` toggles the error border +
error helper color. `prefix`/`suffix` render inside the field (e.g. an icon or a
`0/50` counter). Focus shows the primary-blue border automatically.

```jsx
<Input label="Email" required placeholder="you@company.com" helperText="Work email" />
<Input label="Name" error helperText="This field is required" />
<Input size="sm" suffix="0/50" placeholder="Short bio" />
```

## Adding more components
Each Figma page (Dropdown, Radio, Switch, Checkbox, Chips, Badges, Tooltip,
Tabs, Avatar, Banners, Lists, Loaders, Progress bar) becomes one component here,
following the same pattern: variants → props, tokens → CSS vars, one `.jsx` +
`.css` under `components/`, exported from `index.js`, and a row added to the map
above.
