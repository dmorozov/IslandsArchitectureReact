# Islands Architecture MPA with React + Vite

Note: there is another Vite plugin for MPA development: git@github.com:IndexXuan/vite-plugin-mpa.git
Check react version of MPA: https://github.com/IndexXuan/vite-plugin-mpa/tree/main/examples/react-mpa-app

A modern Multi-Page Application (MPA) implementation using Islands Architecture pattern, designed for migrating from Java Server Pages (JSP) to React with TypeScript.

## Architecture Overview

This project demonstrates the **Islands Architecture** pattern where:

- 🏝️ **Static HTML Pages**: Each page is mostly static/server-rendered HTML
- ⚡ **Interactive Islands**: React components ("islands") hydrate independently where interactivity is needed
- 📦 **Optimized Bundles**: Only necessary JavaScript is shipped per page
- 🎯 **Progressive Enhancement**: Core content works without JavaScript

## Why This Approach?

### For JSP Migration

1. **Progressive Migration**: Migrate one JSP page at a time without breaking existing functionality
2. **Reduced Risk**: Each page is independent, reducing deployment risks
3. **Better Performance**: Only interactive components load JavaScript, unlike full SPA hydration
4. **SEO-Friendly**: Static HTML ensures search engines can crawl content
5. **Modern DX**: Use React, TypeScript, and modern build tools while maintaining MPA structure

### Technical Benefits

- ✅ Smaller JavaScript bundles (each island is separate)
- ✅ Faster initial page loads
- ✅ Independent page deployments
- ✅ Better Core Web Vitals scores
- ✅ Accessibility by default (works without JS)

## Project Structure

```text
├── src/
│   ├── pages/              # Each page is a separate entry point
│   │   ├── home/
│   │   │   ├── index.html  # Home page HTML
│   │   │   └── main.tsx    # Home page entry point
│   │   └── about/
│   │       ├── index.html  # About page HTML
│   │       └── main.tsx    # About page entry point
│   ├── islands/            # Interactive React components
│   │   ├── Counter.island.tsx
│   │   ├── UserProfile.island.tsx
│   │   └── TodoList.island.tsx
│   └── lib/                # Shared utilities
│       └── hydrate-react.ts
├── vite.config.ts          # Vite MPA configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## Tech Stack

- **Build Tool**: Vite 7.x
- **Framework**: React 19.x
- **Language**: TypeScript 5.x
- **Package Manager**: Yarn
- **Architecture**: Multi-Page Application (MPA)
- **Pattern**: Islands Architecture

## Getting Started

### Installation

```bash
yarn install
```

### Development

Start the development server:

```bash
yarn dev
```

The dev server will open at `http://localhost:5173/src/pages/home/index.html`

Navigate between pages:

- Home: `/src/pages/home/index.html`
- About: `/src/pages/about/index.html`

### Build

Build for production:

```bash
yarn build
```

This will:

1. Run TypeScript type checking
2. Build optimized production bundles
3. Output to `dist/` directory

### Preview

Preview the production build:

```bash
yarn preview
```

## How It Works

### 1. Multiple Entry Points

`vite.config.ts` defines multiple HTML entry points:

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'src/pages/home/index.html'),
        about: resolve(__dirname, 'src/pages/about/index.html'),
      },
    },
  },
});
```

### 2. Islands Pattern

Each page contains:

- **Static HTML**: Server-rendered or static content
- **Island Containers**: `<div id="island-name"></div>` placeholders
- **Entry Script**: Hydrates only the interactive islands

Example from `src/pages/home/main.tsx`:

```typescript
import { createRoot } from 'react-dom/client';
import Counter from '../../islands/Counter.island';

const counterElement = document.getElementById('counter-island');
if (counterElement) {
  createRoot(counterElement).render(<Counter />);
}
```

### 3. Island Components

Components following the `.island.tsx` naming convention are interactive React components that hydrate independently.

## Adding a New Page

1. Create a new directory in `src/pages/`:

```bash
mkdir -p src/pages/products
```

2. Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Products</title>
  </head>
  <body>
    <h1>Products Page</h1>
    <div id="product-list-island"></div>
    <script type="module" src="./main.tsx"></script>
  </body>
</html>
```

3. Create `main.tsx`:

```typescript
import { createRoot } from 'react-dom/client';
import ProductList from '../../islands/ProductList.island';

const element = document.getElementById('product-list-island');
if (element) {
  createRoot(element).render(<ProductList />);
}
```

4. Add entry point to `vite.config.ts`:

```typescript
input: {
  home: resolve(__dirname, 'src/pages/home/index.html'),
  about: resolve(__dirname, 'src/pages/about/index.html'),
  products: resolve(__dirname, 'src/pages/products/index.html'),
}
```

## Adding a New Island

1. Create a new component in `src/islands/`:

```typescript
// src/islands/MyWidget.island.tsx
import { useState } from 'react';

export default function MyWidget() {
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>You typed: {value}</p>
    </div>
  );
}
```

2. Add it to a page's `main.tsx`:

```typescript
import MyWidget from '../../islands/MyWidget.island';

const element = document.getElementById('my-widget-island');
if (element) {
  createRoot(element).render(<MyWidget />);
}
```

3. Add the container to the HTML:

```html
<div id="my-widget-island"></div>
```

## Migration Strategy from JSP

### Phase 1: Parallel Implementation

1. Keep existing JSP pages running
2. Create React island versions of interactive components
3. Test in staging environment

### Phase 2: Gradual Rollout

1. Migrate one page at a time
2. Replace JSP dynamic sections with React islands
3. Keep static content as HTML (can be generated server-side)

### Phase 3: Full Migration

1. All pages using Islands Architecture
2. Server still generates HTML (SSR or static)
3. React only for interactive components

## Performance Benefits

With Islands Architecture, you'll see:

- **Reduced Initial Bundle**: ~60KB gzipped for React core (shared across islands)
- **Per-Island Bundles**: 0.8-1.8KB per island component
- **Lazy Hydration**: Islands can hydrate on visibility/interaction
- **Better FCP/LCP**: Static HTML renders immediately

Compare this to a typical SPA where the entire application JavaScript must load before any interactivity.

## Best Practices

### When to Use Islands

✅ **Good use cases:**

- Interactive forms
- Data tables with sorting/filtering
- User dashboards
- Real-time widgets
- Interactive charts

❌ **Avoid for:**

- Simple static content
- Basic navigation
- Purely presentational components

### Naming Convention

- Pages: `src/pages/{page-name}/index.html`
- Islands: `src/islands/{ComponentName}.island.tsx`
- Utilities: `src/lib/{utility-name}.ts`

### Performance Tips

1. **Keep islands small**: Each island should do one thing well
2. **Lazy load heavy islands**: Use `React.lazy()` for large components
3. **Share nothing between islands**: Each island should be independent
4. **Minimize props**: Islands should be self-contained

## Alternatives Considered

### Why Not SPA?

- Full hydration overhead
- Larger initial bundles
- Complex routing needed

### Why Not yarn workspaces?

- Overkill for this use case
- Adds unnecessary complexity
- Better for monorepos with shared packages

### Why Not vite-plugin-mpa?

- Native Vite MPA support is sufficient
- Less dependencies to manage
- More explicit configuration

## Future Enhancements

Potential improvements:

1. **SSR Integration**: Add server-side rendering for dynamic content
2. **Shared Layouts**: Extract common layouts to reduce duplication
3. **Island Preloading**: Preload island code on hover/viewport
4. **Dev Hot Reload**: Improve HMR for islands
5. **Build Optimization**: Further split common chunks

## Resources

- [Islands Architecture Pattern](https://jasonformat.com/islands-architecture/)
- [Vite Multi-Page Apps](https://vitejs.dev/guide/build.html#multi-page-app)
- [React 19 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

MIT
