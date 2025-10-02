'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import Image from 'next/image';

export default function DonationSection() {
  return (
    <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-700/50 mt-12">
      <CardHeader className="text-center">
        <CardTitle className="text-white flex items-center justify-center gap-2 text-xl">
          <Heart className="w-6 h-6 text-red-400" />
          Support This Tool
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="space-y-2">
          <p className="text-white text-lg font-medium">
            Did this calculator help you win a trade? 🎉
          </p>
          <p className="text-gray-300">
            Buy me a coffee ☕ via GCash so I can keep improving this tool!
          </p>
        </div>

        {/* GCash QR Code */}
        <div className="flex flex-col items-center space-y-4">
          <div className="inline-block rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/gcash-qr.webp"
              alt="GCash QR Code for Donations"
              width={300}
              height={400}
              className="block"
              priority
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-600">
          <p className="text-gray-400 text-sm">
            Your donations help keep this calculator free
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
