'use client';

import { useState } from 'react';
import { Pet } from '@/data/pets';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Edit, RotateCcw, Trash2 } from 'lucide-react';

interface PriceEditorProps {
  pets: Pet[];
  customPrices: Record<string, number>;
  updatePetPrice: (petName: string, newPrice: number) => void;
}

const mutationLabels = {
  nopot: 'NoPot',
  fr: 'FR',
  nfr: 'NFR',
  mfr: 'MFR'
};

export default function PriceEditor({ pets, customPrices, updatePetPrice }: PriceEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPet, setEditingPet] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEditing = (petName: string, mutation: keyof Pet['mutations'], currentValue: number) => {
    setEditingPet(`${petName}-${mutation}`);
    setEditValue(currentValue.toString());
  };

  const saveEdit = (petName: string, mutation: keyof Pet['mutations']) => {
    const newValue = parseFloat(editValue);
    if (!isNaN(newValue) && newValue >= 0) {
      updatePetPrice(`${petName}-${mutation}`, newValue);
    }
    setEditingPet(null);
    setEditValue('');
  };

  const resetPrice = (petName: string, mutation: keyof Pet['mutations'], originalValue: number) => {
    updatePetPrice(`${petName}-${mutation}`, originalValue);
  };

  const clearAllPrices = () => {
    // Set all pet prices to zero for all mutations
    pets.forEach(pet => {
      Object.keys(mutationLabels).forEach(mutation => {
        updatePetPrice(`${pet.name}-${mutation}`, 0);
      });
    });
  };

  const getCurrentPrice = (pet: Pet, mutation: keyof Pet['mutations']): number => {
    const customPrice = customPrices[`${pet.name}-${mutation}`];
    return customPrice !== undefined ? customPrice : pet.mutations[mutation];
  };

  const isCustomPrice = (petName: string, mutation: keyof Pet['mutations']): boolean => {
    return customPrices[`${petName}-${mutation}`] !== undefined;
  };

  const getDemandColor = (demand: Pet['demand']) => {
    switch (demand) {
      case 'Amazing':
        return 'text-red-400 border-red-400';
      case 'High':
        return 'text-orange-400 border-orange-400';
      case 'Decent':
        return 'text-yellow-400 border-yellow-400';
      default:
        return 'text-gray-400 border-gray-400';
    }
  };

  const hasCustomPrices = Object.keys(customPrices).length > 0;

  return (
    <Card className="bg-gray-800/50 border-gray-700 mt-8">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-700/30 transition-colors">
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Edit className="w-5 h-5" />
                📋 Pet Price List
              </span>
              {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Click on any price to edit it. Modified prices will be highlighted.
              </p>
              {hasCustomPrices && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={clearAllPrices}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Pet Prices
                </Button>
              )}
            </div>

            {/* Search */}
            <Input
              placeholder="Search pets to edit prices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            />

            {/* Pet Price List */}
            <div className="max-h-96 overflow-y-auto space-y-3">
              {filteredPets.map((pet) => (
                <div key={pet.name} className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium">{pet.name}</h3>
                      <Badge variant="outline" className={`text-xs ${getDemandColor(pet.demand)}`}>
                        {pet.demand}
                      </Badge>
                    </div>
                  </div>

                  {/* Mutation Prices */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    {Object.entries(mutationLabels).map(([mutation, label]) => {
                      const currentPrice = getCurrentPrice(pet, mutation as keyof Pet['mutations']);
                      const originalPrice = pet.mutations[mutation as keyof Pet['mutations']];
                      const isEditing = editingPet === `${pet.name}-${mutation}`;
                      const hasCustomPrice = isCustomPrice(pet.name, mutation as keyof Pet['mutations']);

                      return (
                        <div key={mutation} className="space-y-1">
                          <p className="text-gray-400 text-xs">{label}</p>
                          <div className="flex items-center gap-1">
                            {isEditing ? (
                              <div className="flex gap-1 flex-1">
                                <Input
                                  type="number"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="text-xs h-8 bg-gray-600 border-gray-500"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      saveEdit(pet.name, mutation as keyof Pet['mutations']);
                                    }
                                    if (e.key === 'Escape') {
                                      setEditingPet(null);
                                      setEditValue('');
                                    }
                                  }}
                                  autoFocus
                                />
                                <Button
                                  size="sm"
                                  onClick={() => saveEdit(pet.name, mutation as keyof Pet['mutations'])}
                                  className="h-8 px-2 text-xs"
                                >
                                  ✓
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => startEditing(pet.name, mutation as keyof Pet['mutations'], currentPrice)}
                                className={`justify-start text-left h-8 flex-1 ${
                                  hasCustomPrice ? 'text-green-400 border border-green-400/30' : 'text-white'
                                }`}
                              >
                                ₱{currentPrice.toLocaleString()}
                              </Button>
                            )}

                            {hasCustomPrice && !isEditing && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => resetPrice(pet.name, mutation as keyof Pet['mutations'], originalPrice)}
                                className="h-8 px-2 text-gray-400 hover:text-white"
                                title="Reset to original price"
                              >
                                <RotateCcw className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
