import { loadRoutesData } from '@/lib/data';
import { RouteCard } from '@/components/RouteCard';

export default async function HomePage() {
  const data = await loadRoutesData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Groeipaden bij Lok Installaties
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek de verschillende carrièremogelijkheden binnen onze organisatie. 
              Van trainee tot teamleider, er zijn altijd mogelijkheden om te groeien.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Over deze groeipaden
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Deze overzicht toont de verschillende carrièremogelijkheden binnen Lok Installaties. 
              Elk groeipad bestaat uit verschillende stappen, van instapniveau tot senior functies. 
              Klik op een groeipad om de volledige route te bekijken en meer te leren over elke functie.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🎯 Duidelijke richting</h3>
                <p className="text-sm text-gray-600">
                  Zie precies welke stappen je kunt zetten om je carrière te ontwikkelen.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📚 Trainingen</h3>
                <p className="text-sm text-gray-600">
                  Ontdek welke certificeringen en trainingen je nodig hebt voor elke functie.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">💬 Contact</h3>
                <p className="text-sm text-gray-600">
                  Neem direct contact op met HR om je carrièreplannen te bespreken.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Lok Installaties. Alle rechten voorbehouden.</p>
            <p className="mt-2 text-sm">
              Voor vragen over carrièremogelijkheden, neem contact op met{' '}
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