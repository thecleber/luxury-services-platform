import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Send } from 'lucide-react';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export const SupportChat = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96">
          <div className="p-4 bg-indigo-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">{t('support.chatTitle')}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-96 p-4 overflow-y-auto">
            {/* Chat messages will be rendered here */}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md"
                placeholder={t('support.typingPlaceholder')}
              />
              <button
                className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};