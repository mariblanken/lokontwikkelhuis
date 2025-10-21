import { notFound } from 'next/navigation';
import { loadRoutesData, getRouteById } from '@/lib/data';
import { Timeline } from '@/components/Timeline';
import { PrintButton } from '@/components/PrintButton';
import Link from 'next/link';

interface RoutePageProps {
  params: {
    routeId: string;
  };
}

export default async function RoutePage({ params }: RoutePageProps) {
  const data = await loadRoutesData();
  const resolvedParams = await params;
  const route = getRouteById(data, resolvedParams.routeId);

  if (!route) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Terug naar overzicht"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${route.meta.color}20` }}
                >
                  <svg className="w-6 h-6" style={{ color: route.meta.color }} fill="currentColor" viewBox="0 0 20 20">
                    {route.meta.icon === 'bolt' && (
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    )}
                    {route.meta.icon === 'wrench' && (
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    )}
                    {route.meta.icon === 'tool' && (
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    )}
                    {route.meta.icon === 'monitor' && (
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 1v6h10V5H5z" clipRule="evenodd" />
                    )}
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{route.name}</h1>
                  <p className="text-gray-600">{route.summary}</p>
                </div>
              </div>
            </div>
            
            {/* Print button */}
            <PrintButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Timeline route={route} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Lok Installaties. Alle rechten voorbehouden.</p>
            <p className="mt-2 text-sm">
              Voor vragen over dit groeipad, neem contact op met{' '}
              <a 
                href="mailto:hr@lokinstallaties.nl" 
                className="text-blue-600 hover:text-blue-800"
              >
                hr@lokinstallaties.nl
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
