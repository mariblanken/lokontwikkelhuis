export interface Training {
  label: string;
  provider: string;
  link: string;
}

export interface Step {
  id: string;
  title: string;
  level: string;
  description: string;
  requirements: string[];
  recommendedTraining: Training[];
  nextStepId: string | null;
  altNext?: string[];
  notes?: string;
}

export interface RouteMeta {
  icon: string;
  color: string;
}

export interface Route {
  id: 'e' | 'w' | 'service' | 'office';
  name: string;
  summary: string;
  steps: Step[];
  meta: RouteMeta;
}

export interface RoutesData {
  routes: Route[];
}
