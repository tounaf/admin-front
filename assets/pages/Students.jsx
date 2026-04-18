import React, { useState, useEffect } from 'react';
import { StudentService } from '../utils/api';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    StudentService.getAll()
      .then(res => {
        setStudents(res.data['hydra:member'] || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        // Fallback to mock data for demo if API fails/is empty
        setStudents([
          { id: 1, firstName: 'Jean', lastName: 'Dupont', birthDate: '2015-05-12', gender: 'M', registrationDate: '2023-09-01' },
          { id: 2, firstName: 'Marie', lastName: 'Curie', birthDate: '2016-11-20', gender: 'F', registrationDate: '2023-09-02' },
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Chargement...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher un élève..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Ajouter un élève
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Élève</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Date de naissance</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Sexe</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Inscrit le</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                      {student.firstName[0]}{student.lastName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{student.firstName} {student.lastName}</p>
                      <p className="text-xs text-gray-500">ID: #{student.id.toString().padStart(4, '0')}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">{new Date(student.birthDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    student.gender === 'M' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                  }`}>
                    {student.gender === 'M' ? 'Masculin' : 'Féminin'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">{new Date(student.registrationDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
