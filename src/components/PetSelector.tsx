'use client';

import { useState, useMemo } from 'react';
import { Pet } from '@/data/pets';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

interface PetSelectorProps {
  pets: Pet[];
  onSelect: (pet: Pet, mutation: keyof Pet['mutations']) => void;
  onClose: () => void;
}

const mutationLabels = {
  nopot: 'NoPot',
  fr: 'FR',
  nfr: 'NFR',
  mfr: 'MFR'
};

const mutationColors = {
  nopot: 'bg-gray-600 text-white',
  fr: 'bg-blue-600 text-white',
  nfr: 'bg-pink-600 text-white',
  mfr: 'bg-purple-600 text-white'
};

export default function PetSelector({ pets, onSelect, onClose }: PetSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMutation, setSelectedMutation] = useState<keyof Pet['mutations']>('nopot');

  const filteredPets = useMemo(() => {
    return pets.filter(pet =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pets, searchTerm]);

  const handlePetSelect = (pet: Pet) => {
    onSelect(pet, selectedMutation);
  };

  const getDemandColor = (demand: Pet['demand']) => {
    switch (demand) {
      case 'Amazing':
        return 'text-red-400';
      case 'High':
        return 'text-orange-400';
      case 'Decent':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-gray-800 border-gray-700 text-white">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl">Select a Pet</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search pets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>

          {/* Mutation Selector */}
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Select Mutation:</p>
            <div className="flex gap-2">
              {Object.entries(mutationLabels).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedMutation === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMutation(key as keyof Pet['mutations'])}
                  className={`${
                    selectedMutation === key
                      ? mutationColors[key as keyof Pet['mutations']]
                      : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Pet List */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredPets.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No pets found</p>
            ) : (
              filteredPets.map((pet) => (
                <div
                  key={pet.name}
                  onClick={() => handlePetSelect(pet)}
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{pet.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={`text-xs ${getDemandColor(pet.demand)} border-current`}>
                        {pet.demand}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`text-xs ${mutationColors[selectedMutation]}`}>
                      {mutationLabels[selectedMutation]}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
