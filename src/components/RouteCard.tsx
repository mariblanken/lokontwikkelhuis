import Link from 'next/link';
import { Route } from '@/lib/types';
import { Icon } from './Icon';

interface RouteCardProps {
  route: Route;
}

export function RouteCard({ route }: RouteCardProps) {
  return (
    <Link
      href={`/route/${route.id}`}
      className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-gray-300"
    >
      <div className="flex items-center space-x-4">
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${route.meta.color}20` }}
        >
          <Icon 
            name={route.meta.icon} 
            className="w-8 h-8"
            style={{ color: route.meta.color }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
            {route.name}
          </h3>
          <p className="text-gray-600 mt-1">
            {route.summary}
          </p>
        </div>
        <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
