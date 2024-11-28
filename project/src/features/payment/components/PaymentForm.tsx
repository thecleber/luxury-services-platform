import React from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, Lock } from 'lucide-react';
import { createPaymentSession } from '../services/stripeService';
import { useNotificationStore } from '../../notifications/stores/notificationStore';

interface PaymentFormProps {
  bookingId: string;
  amount: number;
  currency: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  bookingId,
  amount,
  currency,
}) => {
  const { t } = useTranslation();
  const { addNotification } = useNotificationStore();

  const handlePayment = async () => {
    try {
      await createPaymentSession(bookingId);
    } catch (error) {
      addNotification({
        type: 'error',
        title: t('payment.error'),
        message: t('payment.errorMessage'),
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{t('payment.title')}</h2>
        <Lock className="h-5 w-5 text-gray-500" />
      </div>

      <div className="mb-6">
        <p className="text-lg font-medium">
          {t('payment.total')}: {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currency,
          }).format(amount)}
        </p>
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
      >
        <CreditCard className="h-5 w-5" />
        <span>{t('payment.proceedToPayment')}</span>
      </button>
    </div>
  );
};