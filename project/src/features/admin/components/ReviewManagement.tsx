import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Flag, CheckCircle, XCircle } from 'lucide-react';
import { useAdminStore } from '../stores/adminStore';

export const ReviewManagement = () => {
  const { t } = useTranslation();
  const { reviews, moderateReview } = useAdminStore();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <Star className="h-6 w-6 text-yellow-500" />
            <span>{t('admin.reviews.title')}</span>
          </h2>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {reviews?.map((review) => (
              <div
                key={review.id}
                className="border rounded-lg p-4 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                  {review.flagged && (
                    <Flag className="h-5 w-5 text-red-500" />
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => moderateReview(review.id, 'approve')}
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>{t('admin.reviews.approve')}</span>
                  </button>
                  <button
                    onClick={() => moderateReview(review.id, 'remove')}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                  >
                    <XCircle className="h-5 w-5" />
                    <span>{t('admin.reviews.remove')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};