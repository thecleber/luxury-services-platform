import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Star, DollarSign, Calendar } from 'lucide-react';

export const SearchFilters = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            placeholder={t('search.byService')}
          />
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            placeholder={t('search.location')}
          />
        </div>

        <div className="relative">
          <Star className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select className="w-full pl-10 pr-4 py-2 border rounded-md appearance-none">
            <option value="">{t('search.rating')}</option>
            <option value="5">5 {t('search.stars')}</option>
            <option value="4">4+ {t('search.stars')}</option>
            <option value="3">3+ {t('search.stars')}</option>
          </select>
        </div>

        <div className="relative">
          <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select className="w-full pl-10 pr-4 py-2 border rounded-md appearance-none">
            <option value="">{t('search.priceRange')}</option>
            <option value="low">{t('search.priceLow')}</option>
            <option value="medium">{t('search.priceMedium')}</option>
            <option value="high">{t('search.priceHigh')}</option>
          </select>
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="date"
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};