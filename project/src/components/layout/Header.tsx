import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu, Globe, User } from 'lucide-react';

export const Header = () => {
  const { t, i18n } = useTranslation();
  
  const languages = [
    { code: 'pt-BR', name: 'Português' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-900">LuxeServ</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Globe className="h-5 w-5 text-gray-600" />
              <select
                className="appearance-none bg-transparent pl-7 pr-4 py-2"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              {t('common.login')}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};