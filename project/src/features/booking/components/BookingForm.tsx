import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, MessageSquare } from 'lucide-react';

export const BookingForm = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">{t('booking.requestService')}</h2>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('booking.selectDate')}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('booking.selectTime')}
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="time"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('booking.message')}
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              className="w-full pl-10 pr-4 py-2 border rounded-md h-32"
              placeholder={t('booking.messagePlaceholder')}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {t('booking.confirm')}
        </button>
      </form>
    </div>
  );
};