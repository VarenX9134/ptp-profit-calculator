'use client';

import { useState } from 'react';
import { Pet, pets } from '@/data/pets';
import TradeCalculator from '@/components/TradeCalculator';
import PriceEditor from '@/components/PriceEditor';
import DonationSection from '@/components/DonationSection';

export default function HomePage() {
  const [customPrices, setCustomPrices] = useState<Record<string, number>>({});

  const updatePetPrice = (petName: string, newPrice: number) => {
    setCustomPrices(prev => ({
      ...prev,
      [petName]: newPrice
    }));
  };

  const getPetPrice = (pet: Pet, mutation: keyof Pet['mutations']): number => {
    const customPrice = customPrices[`${pet.name}-${mutation}`];
    return customPrice !== undefined ? customPrice : pet.mutations[mutation];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            PTP Profit Calculator
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            This calculator only includes pets with Amazing, High, or Decent demand.
          </p>
        </div>

        {/* Main Calculator */}
        <TradeCalculator
          pets={pets}
          getPetPrice={getPetPrice}
        />

        {/* Price Editor */}
        <PriceEditor
          pets={pets}
          customPrices={customPrices}
          updatePetPrice={updatePetPrice}
        />

        {/* Donation Section */}
        <DonationSection />
      </div>
    </div>
  );
}
