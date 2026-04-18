import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';

const Fees = () => {
  const [filter, setFilter] = useState('unpaid');
  const [selectedMonth, setSelectedMonth] = useState('Avril');

  const fees = [
    { id: 1, student: 'Jean Dupont', amount: 150, month: 'Avril', year: 2024, status: 'paid', date: '2024-04-05' },
    { id: 2, student: 'Marie Curie', amount: 150, month: 'Avril', year: 2024, status: 'unpaid', date: '-' },
    { id: 3, student: 'Paul Martin', amount: 150, month: 'Avril', year: 2024, status: 'unpaid', date: '-' },
  ];

  const filteredFees = filter === 'all' ? fees : fees.filter(f => f.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-2 p-1 bg-white rounded-lg border border-gray-200 w-fit">
          <button
            onClick={() => setFilter('unpaid')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              filter === 'unpaid' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Impayés
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              filter === 'paid' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Payés
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              filter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Tous
          </button>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Mars</option>
            <option>Avril</option>
            <option>Mai</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Élève</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Montant</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Période</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Date Paiement</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredFees.map((fee) => (
              <tr key={fee.id}>
                <td className="px-6 py-4 font-semibold text-gray-800">{fee.student}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{fee.amount} €</td>
                <td className="px-6 py-4 text-gray-600">{fee.month} {fee.year}</td>
                <td className="px-6 py-4">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold w-fit ${
                    fee.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {fee.status === 'paid' ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {fee.status === 'paid' ? 'Payé' : 'En attente'}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{fee.date}</td>
                <td className="px-6 py-4 text-right">
                  {fee.status === 'unpaid' && (
                    <button className="text-blue-600 font-bold text-sm hover:underline">
                      Marquer comme payé
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredFees.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            Aucun résultat pour ces critères.
          </div>
        )}
      </div>
    </div>
  );
};

export default Fees;
