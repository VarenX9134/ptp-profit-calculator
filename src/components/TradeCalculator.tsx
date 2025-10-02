'use client';

import { useState } from 'react';
import { Pet } from '@/data/pets';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, RefreshCw } from 'lucide-react';
import PetSelector from './PetSelector';
import TradeResult from './TradeResult';

interface TradedPet {
  pet: Pet;
  mutation: keyof Pet['mutations'];
  id: string;
}

interface TradeCalculatorProps {
  pets: Pet[];
  getPetPrice: (pet: Pet, mutation: keyof Pet['mutations']) => number;
}

export default function TradeCalculator({ pets, getPetPrice }: TradeCalculatorProps) {
  const [yourPets, setYourPets] = useState<TradedPet[]>([]);
  const [theirPets, setTheirPets] = useState<TradedPet[]>([]);
  const [showPetSelector, setShowPetSelector] = useState<'your' | 'their' | null>(null);

  const addPet = (side: 'your' | 'their', pet: Pet, mutation: keyof Pet['mutations']) => {
    const newPet: TradedPet = {
      pet,
      mutation,
      id: Date.now().toString() + Math.random()
    };

    if (side === 'your') {
      setYourPets(prev => [...prev, newPet]);
    } else {
      setTheirPets(prev => [...prev, newPet]);
    }
    setShowPetSelector(null);
  };

  const removePet = (side: 'your' | 'their', id: string) => {
    if (side === 'your') {
      setYourPets(prev => prev.filter(p => p.id !== id));
    } else {
      setTheirPets(prev => prev.filter(p => p.id !== id));
    }
  };

  const clearAll = () => {
    setYourPets([]);
    setTheirPets([]);
  };

  const calculateValue = (pets: TradedPet[]): number => {
    return pets.reduce((total, tradedPet) => {
      return total + getPetPrice(tradedPet.pet, tradedPet.mutation);
    }, 0);
  };

  const yourValue = calculateValue(yourPets);
  const theirValue = calculateValue(theirPets);

  return (
    <div className="space-y-6">
      {/* Trade Result */}
      <TradeResult yourValue={yourValue} theirValue={theirValue} />

      {/* Trade Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your Side */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center justify-between">
              <span>YOU</span>
              <span className="text-green-400 text-lg">₱{yourValue.toLocaleString()}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {yourPets.map((tradedPet) => (
              <div key={tradedPet.id} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                <div className="flex-1">
                  <p className="text-white font-medium">{tradedPet.pet.name}</p>
                  <p className="text-gray-400 text-sm capitalize">{tradedPet.mutation}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-medium">
                    ₱{getPetPrice(tradedPet.pet, tradedPet.mutation).toLocaleString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePet('your', tradedPet.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={() => setShowPetSelector('your')}
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700/50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Pet
            </Button>
          </CardContent>
        </Card>

        {/* Their Side */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center justify-between">
              <span>THEM</span>
              <span className="text-blue-400 text-lg">₱{theirValue.toLocaleString()}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {theirPets.map((tradedPet) => (
              <div key={tradedPet.id} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                <div className="flex-1">
                  <p className="text-white font-medium">{tradedPet.pet.name}</p>
                  <p className="text-gray-400 text-sm capitalize">{tradedPet.mutation}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400 font-medium">
                    ₱{getPetPrice(tradedPet.pet, tradedPet.mutation).toLocaleString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePet('their', tradedPet.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={() => setShowPetSelector('their')}
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700/50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Pet
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Price Update Note */}
      <div className="text-center">
        <p className="text-gray-400 text-sm">
          Pet prices don't match what you paid or the current market value? You can easily update them in the Pet Price List.
        </p>
      </div>

      {/* Clear All Button */}
      {(yourPets.length > 0 || theirPets.length > 0) && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={clearAll}
            className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      )}

      {/* Pet Selector Modal */}
      {showPetSelector && (
        <PetSelector
          pets={pets}
          onSelect={(pet, mutation) => addPet(showPetSelector, pet, mutation)}
          onClose={() => setShowPetSelector(null)}
        />
      )}
    </div>
  );
}
