# Career Paths - Lok Installaties

Een lightweight interne web app die de vaste carrièreroutes bij Lok Installaties toont. Gebruikers kunnen door vooraf gedefinieerde routes bladeren (E, W, Service & Onderhoud, Kantoor/Engineering) en elke route is een tijdlijn van stappen.

## Features

- **4 Carrièreroutes**: Elektrotechniek, Werktuigbouwkunde, Service & Onderhoud, Kantoor
- **Interactieve tijdlijn**: Klik op stappen voor details
- **Deep linking**: Deel directe links naar specifieke stappen
- **Mobile-first design**: Responsive voor alle apparaten
- **Print-vriendelijk**: Schone PDF export van routes
- **Accessibility**: Volledig toegankelijk met keyboard navigation

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** voor styling
- **Lucide React** voor iconen
- **Static hosting** op Vercel/Netlify

## Installatie

```bash
# Dependencies installeren
npm install

# Development server starten
npm run dev

# Production build
npm run build
```

## Data beheer

De carrièredata staat in `/public/data/routes.nl.json`. Om routes of stappen toe te voegen/wijzigen:

1. Bewerk het JSON bestand
2. Volg het data model in `/src/lib/types.ts`
3. Herstart de development server

### Data structuur

```typescript
interface Route {
  id: 'e' | 'w' | 'service' | 'office';
  name: string;
  summary: string;
  steps: Step[];
  meta: { icon: string; color: string };
}

interface Step {
  id: string;
  title: string;
  level: string;
  description: string;
  requirements: string[];
  recommendedTraining: Training[];
  nextStepId: string | null;
  notes?: string;
}
```

## Deployment

De app is geoptimaliseerd voor static hosting:

```bash
npm run build
npm run start
```

Voor Vercel:
```bash
vercel --prod
```

## Environment variabelen

Maak een `.env.local` bestand voor lokale configuratie:

```env
# HR email voor contact functionaliteit
HR_EMAIL=hr@lok-installaties.nl
```

## Browser ondersteuning

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **LCP**: < 2.0s op 4G mid-range device
- **Bundle size**: < 100KB gzipped
- **Accessibility**: WCAG 2.1 AA compliant

## Licentie

© 2024 Lok Installaties. Alle rechten voorbehouden.