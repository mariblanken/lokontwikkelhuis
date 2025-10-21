'use client';

import { useEffect, useRef } from 'react';
import { Step, Route } from '@/lib/types';
import { copyToClipboard } from '@/lib/data';
import { Icon } from './Icon';

interface StepDialogProps {
  step: Step;
  route: Route;
  isOpen: boolean;
  onClose: () => void;
  onNextStep: () => void;
}

export function StepDialog({ step, route, isOpen, onClose, onNextStep }: StepDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus the dialog when it opens
      setTimeout(() => {
        dialogRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle focus trap
  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableElements = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/route/${route.id}#step-${step.id}`;
    try {
      await copyToClipboard(url);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleContactHR = () => {
    const subject = `Groeipad ${route.name} – ${step.title}`;
    const body = `Beste HR team,\n\nIk ben geïnteresseerd in het groeipad voor ${step.title} binnen ${route.name}.\n\nLink naar de functie: ${window.location.origin}/route/${route.id}#step-${step.id}\n\nMet vriendelijke groet`;
    
    const mailtoUrl = `mailto:hr@lokinstallaties.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={dialogRef}
          className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          tabIndex={-1}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${route.meta.color}20` }}
              >
                <Icon 
                  name={route.meta.icon} 
                  className="w-6 h-6"
                  style={{ color: route.meta.color }}
                />
              </div>
              <div>
                <h2 id="dialog-title" className="text-2xl font-bold text-gray-900">
                  {step.title}
                </h2>
                <p className="text-gray-600">{step.level}</p>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1"
              aria-label="Sluit dialoog"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Functieomschrijving</h3>
              <p id="dialog-description" className="text-gray-700 leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Requirements */}
            {step.requirements.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Vereisten</h3>
                <ul className="space-y-1">
                  {step.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Training */}
            {step.recommendedTraining.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Aanbevolen trainingen</h3>
                <div className="space-y-2">
                  {step.recommendedTraining.map((training, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{training.label}</p>
                        <p className="text-sm text-gray-600">{training.provider}</p>
                      </div>
                      <a
                        href={training.link}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Bekijk →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {step.notes && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Opmerkingen</h3>
                <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
                  {step.notes}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <div className="flex space-x-3">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Link kopiëren
              </button>
              <button
                onClick={handleContactHR}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Contact HR
              </button>
            </div>
            
            {step.nextStepId && (
              <button
                onClick={onNextStep}
                className="px-6 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
                style={{ backgroundColor: route.meta.color }}
              >
                <span>Volgende stap</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
