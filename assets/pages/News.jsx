import React from 'react';
import { Plus, Calendar, Tag, ExternalLink } from 'lucide-react';

const News = () => {
  const newsItems = [
    { id: 1, title: "Inscriptions 2024-2025", category: "Admission", date: "2024-04-15", status: "Publié" },
    { id: 2, title: "Vacances de printemps", category: "Calendrier", date: "2024-04-10", status: "Publié" },
    { id: 3, title: "Menu de la cantine - Mai", category: "Vie scolaire", date: "2024-04-18", status: "Brouillon" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Actualités & Programmes</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
          <Plus size={20} />
          Publier une nouvelle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((news) => (
          <div key={news.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="h-48 bg-gray-100 relative">
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-blue-600 shadow-sm">
                  {news.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                <Calendar size={14} />
                {news.date}
              </div>
              <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                {news.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                Les parents d'élèves sont informés que les réinscriptions pour l'année scolaire prochaine...
              </p>
              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className={`text-xs font-bold ${
                  news.status === 'Publié' ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {news.status}
                </span>
                <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                  Modifier <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
