'use client';

import { useState, useEffect } from 'react';
import { Route, Step } from '@/lib/types';
import { StepDialog } from './StepDialog';

interface TimelineProps {
  route: Route;
}

export function Timeline({ route }: TimelineProps) {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle deep linking
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const stepId = hash.replace('#step-', '');
      const step = route.steps.find(s => s.id === stepId);
      if (step) {
        setSelectedStep(step);
        setIsDialogOpen(true);
      }
    }
  }, [route.steps]);

  const handleStepClick = (step: Step) => {
    setSelectedStep(step);
    setIsDialogOpen(true);
    
    // Update URL hash
    window.history.pushState(null, '', `#step-${step.id}`);
  };

  const handleNextStep = () => {
    if (selectedStep && selectedStep.nextStepId) {
      const nextStep = route.steps.find(s => s.id === selectedStep.nextStepId);
      if (nextStep) {
        setSelectedStep(nextStep);
        window.history.pushState(null, '', `#step-${nextStep.id}`);
        
        // Scroll to next step
        const nextStepElement = document.getElementById(`step-${nextStep.id}`);
        if (nextStepElement) {
          nextStepElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedStep(null);
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{route.name}</h1>
            <p className="text-gray-600 mt-2">{route.summary}</p>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
            <span>{route.steps.length} stappen</span>
          </div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-300"></div>
            
            <div className="flex justify-between items-start">
              {route.steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center relative">
                  {/* Step marker */}
                  <button
                    id={`step-${step.id}`}
                    onClick={() => handleStepClick(step)}
                    className="relative z-10 w-16 h-16 rounded-full border-4 border-white shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    style={{ backgroundColor: route.meta.color }}
                    aria-label={`Bekijk ${step.title}`}
                  >
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </button>
                  
                  {/* Step label */}
                  <div className="mt-4 text-center max-w-32">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {step.level}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 min-w-max">
              {route.steps.map((step, index) => (
                <button
                  key={step.id}
                  id={`step-${step.id}`}
                  onClick={() => handleStepClick(step)}
                  className="flex-shrink-0 w-48 p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: route.meta.color }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {step.level}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step Dialog */}
      {selectedStep && (
        <StepDialog
          step={selectedStep}
          route={route}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onNextStep={handleNextStep}
        />
      )}
    </>
  );
}
