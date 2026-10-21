# Al-Rimal Energy (Next.js + React Three Fiber)

Concept corporate site for a Saudi oil company. Next.js 15 App Router, React 19, `@react-three/fiber` + `three`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure
- `app/` routes: `/`, `/about`, `/operations`, `/operations/[upstream|downstream|petrochemicals|trading]`, `/sustainability`, `/investors`, `/careers`, `/news`, `/news/[1-3]`, `/contact`
- `lib/data.js` all page content (edit copy here)
- `components/Scene.jsx` the 3D container-yard background (React Three Fiber)
- `components/ui.jsx` client components: header, accordion, counters, scroll reveal, contact form
- `public/yard.jpg` fallback background (reduced motion, no WebGL)

The contact form only shows a confirmation; connect it to an API route or email service before launch.
