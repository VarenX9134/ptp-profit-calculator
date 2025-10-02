'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Scale, CheckCircle, XCircle } from 'lucide-react';

interface TradeResultProps {
  yourValue: number;
  theirValue: number;
}

export default function TradeResult({ yourValue, theirValue }: TradeResultProps) {
  const difference = theirValue - yourValue;
  const percentage = yourValue > 0 ? Math.abs((difference / yourValue) * 100) : 0;

  const getTradeStatus = () => {
    if (Math.abs(difference) < 10) { // Within ₱10 is considered fair
      return 'fair';
    }
    return difference > 0 ? 'win' : 'loss';
  };

  const status = getTradeStatus();

  const getStatusColor = () => {
    switch (status) {
      case 'win':
        return 'text-green-400 border-green-400 bg-green-400/10';
      case 'loss':
        return 'text-red-400 border-red-400 bg-red-400/10';
      case 'fair':
        return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      default:
        return 'text-gray-400 border-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'win':
        return <TrendingUp className="w-6 h-6" />;
      case 'loss':
        return <TrendingDown className="w-6 h-6" />;
      case 'fair':
        return <Scale className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'win':
        return 'WIN';
      case 'loss':
        return 'LOSS';
      case 'fair':
        return 'FAIR';
      default:
        return '';
    }
  };

  const getRecommendation = () => {
    switch (status) {
      case 'win':
        return {
          text: '✅ Accept this trade.',
          icon: <CheckCircle className="w-5 h-5 text-green-400" />
        };
      case 'loss':
        return {
          text: '❌ Don\'t accept. Ask for more pets.',
          icon: <XCircle className="w-5 h-5 text-red-400" />
        };
      case 'fair':
        return {
          text: '⚖️ Trade is balanced. Decide based on preference.',
          icon: <Scale className="w-5 h-5 text-yellow-400" />
        };
      default:
        return { text: '', icon: null };
    }
  };

  const recommendation = getRecommendation();

  if (yourValue === 0 && theirValue === 0) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400 text-lg">Add pets to both sides to calculate trade value</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-2 ${getStatusColor()}`}>
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          {/* Trade Status */}
          <div className="flex items-center justify-center gap-3">
            {getStatusIcon()}
            <h2 className={`text-3xl font-bold ${getStatusColor().split(' ')[0]}`}>
              {getStatusText()}
            </h2>
          </div>

          {/* Value Difference */}
          <div className="space-y-2">
            <p className="text-white text-xl">
              {status === 'win' ? 'Profit' : status === 'loss' ? 'Loss' : 'Difference'}:
              <span className={`ml-2 font-bold ${getStatusColor().split(' ')[0]}`}>
                ₱{Math.abs(difference).toLocaleString()}
              </span>
            </p>

            {percentage > 0 && (
              <p className="text-gray-300">
                {percentage.toFixed(1)}% {status === 'win' ? 'profit' : status === 'loss' ? 'loss' : 'difference'}
              </p>
            )}
          </div>

          {/* Values Breakdown */}
          <div className="grid grid-cols-2 gap-4 text-center border-t border-gray-600 pt-4">
            <div>
              <p className="text-gray-400 text-sm">Your Value</p>
              <p className="text-green-400 text-lg font-semibold">₱{yourValue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Their Value</p>
              <p className="text-blue-400 text-lg font-semibold">₱{theirValue.toLocaleString()}</p>
            </div>
          </div>

          {/* Recommendation */}
          <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${getStatusColor().split(' ').slice(2).join(' ')}`}>
            {recommendation.icon}
            <p className="text-white font-medium">{recommendation.text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
