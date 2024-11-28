import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

export const ReviewForm = () => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">{t('reviews.leaveReview')}</h2>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('reviews.rating')}
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('reviews.comment')}
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-md h-32"
            placeholder={t('reviews.commentPlaceholder')}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {t('reviews.submit')}
        </button>
      </form>
    </div>
  );
};