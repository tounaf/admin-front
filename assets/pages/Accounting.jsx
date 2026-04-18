import React from 'react';
import { TrendingUp, TrendingDown, Plus, Download } from 'lucide-react';

const Accounting = () => {
  const movements = [
    { id: 1, label: "Écolage Avril - Jean Dupont", type: "entry", amount: 150, category: "Écolage", date: "2024-04-18" },
    { id: 2, label: "Salaire Gardien - Mars", type: "exit", amount: 450, category: "Salaire", date: "2024-04-05" },
    { id: 3, label: "Achat matériel bureau", type: "exit", amount: 85, category: "Matériel", date: "2024-04-12" },
    { id: 4, label: "Droit d'inscription - Marie Curie", type: "entry", amount: 200, category: "Inscription", date: "2024-04-17" },
  ];

  const totalEntries = movements.filter(m => m.type === 'entry').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExits = movements.filter(m => m.type === 'exit').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Mouvements Comptables</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-600">
            <Download size={18} />
            Exporter
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            <Plus size={20} />
            Nouvelle Opération
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Total Entrées</p>
          <h3 className="text-2xl font-bold text-green-600 mt-1">+{totalEntries} €</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Total Sorties</p>
          <h3 className="text-2xl font-bold text-red-600 mt-1">-{totalExits} €</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border-l-4 border-blue-500 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Solde Période</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-1">{totalEntries - totalExits} €</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Date</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Libellé</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Catégorie</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Montant</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {movements.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 text-gray-500 text-sm">{m.date}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{m.label}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold uppercase tracking-wider">
                    {m.category}
                  </span>
                </td>
                <td className={`px-6 py-4 font-bold ${
                  m.type === 'entry' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {m.type === 'entry' ? '+' : '-'}{m.amount} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounting;
