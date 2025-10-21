import { RoutesData } from './types';
import routesData from '../data/routes.nl.json';

let cachedData: RoutesData | null = null;

export async function loadRoutesData(): Promise<RoutesData> {
  if (cachedData) {
    return cachedData;
  }

  try {
    // Import data directly for server-side rendering
    cachedData = routesData as RoutesData;
    return cachedData;
  } catch (error) {
    console.error('Error loading routes data:', error);
    // Return fallback data if loading fails
    return {
      routes: []
    };
  }
}

export function getRouteById(routes: RoutesData, routeId: string) {
  return routes.routes.find(route => route.id === routeId);
}

export function getStepById(route: Route, stepId: string) {
  return route.steps.find(step => step.id === stepId);
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    return new Promise((resolve, reject) => {
      if (document.execCommand('copy')) {
        resolve();
      } else {
        reject(new Error('Unable to copy to clipboard'));
      }
      document.body.removeChild(textArea);
    });
  }
}
