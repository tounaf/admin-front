import React from 'react';
import {
  Users,
  CreditCard,
  TrendingUp,
  TrendingDown,
  AlertCircle
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-gray-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center gap-1 text-sm">
        <TrendingUp size={16} className="text-green-500" />
        <span className="text-green-500 font-medium">{trend}</span>
        <span className="text-gray-400">vs mois dernier</span>
      </div>
    )}
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Élèves"
          value="248"
          icon={Users}
          color="bg-blue-500"
          trend="+4%"
        />
        <StatCard
          title="Recettes (Mois)"
          value="12,500 €"
          icon={TrendingUp}
          color="bg-green-500"
        />
        <StatCard
          title="Dépenses (Mois)"
          value="8,200 €"
          icon={TrendingDown}
          color="bg-red-500"
        />
        <StatCard
          title="Écolages Impayés"
          value="15"
          icon={AlertCircle}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Derniers Écolages</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold">Jean Dupont</p>
                    <p className="text-xs text-gray-500">Avril 2024</p>
                  </div>
                </div>
                <span className="font-bold text-green-600">+150 €</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Actualités Récentes</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0"></div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase">Événement</span>
                  <h4 className="font-bold mt-1">Excursion de fin d'année</h4>
                  <p className="text-sm text-gray-500 line-clamp-2">Les détails concernant la sortie à la ferme pédagogique...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
