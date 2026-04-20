import React, { useState, useEffect } from 'react';
import { StudentService, ClasseService } from '../utils/api';
import { Search, Plus, Edit2, Trash2, User, Mail, Phone, Calendar as CalendarIcon, MapPin, GraduationCap } from 'lucide-react';
import Modal from '../components/Modal';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: 'M',
    address: '',
    phoneNumber: '',
    email: '',
    classe: ''
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentsData, classesData] = await Promise.all([
        StudentService.getAll(),
        ClasseService.getAll()
      ]);
      setStudents(studentsData);
      setClasses(classesData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData };
    if (data.classe === '') delete data.classe;

    StudentService.create(data)
      .then(() => {
        setIsModalOpen(false);
        setFormData({ firstName: '', lastName: '', birthDate: '', gender: 'M', address: '', phoneNumber: '', email: '', classe: '' });
        loadData();
      })
      .catch(err => console.error(err));
  };

  const openDetail = (student) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
  };

  if (loading && students.length === 0) return <div className="p-8 text-center text-gray-500">Chargement...</div>;

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
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Ajouter un élève
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Élève</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Classe</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Date de naissance</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Sexe</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                onClick={() => openDetail(student)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 uppercase">
                      {student.firstName[0]}{student.lastName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{student.firstName} {student.lastName}</p>
                      <p className="text-xs text-gray-500">ID: #{student.id.toString().padStart(4, '0')}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                    <span className="text-gray-700 font-medium">{student.classe?.name || 'Non assigné'}</span>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">{new Date(student.birthDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    student.gender === 'M' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                  }`}>
                    {student.gender === 'M' ? 'Masculin' : 'Féminin'}
                  </span>
                </td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
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
        {students.length === 0 && !loading && (
            <div className="p-12 text-center text-gray-500 italic">Aucun élève trouvé.</div>
        )}
      </div>

      {/* Modal Ajouter Élève */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ajouter un nouvel élève">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                required
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                required
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                <input
                required
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
                <select
                value={formData.classe}
                onChange={(e) => setFormData({...formData, classe: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                <option value="">Sélectionner une classe</option>
                {classes.map(c => (
                    <option key={c.id} value={`/api/classes/${c.id}`}>{c.name}</option>
                ))}
                </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Parent)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <textarea
              rows="3"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
            Enregistrer l'élève
          </button>
        </form>
      </Modal>

      {/* Fiche Élève Detail */}
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Fiche Élève">
        {selectedStudent && (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg uppercase">
                {selectedStudent.firstName[0]}{selectedStudent.lastName[0]}
              </div>
              <h4 className="text-2xl font-bold text-gray-800">{selectedStudent.firstName} {selectedStudent.lastName}</h4>
              <p className="text-blue-600 font-medium">Inscrit le {new Date(selectedStudent.registrationDate).toLocaleDateString()}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <GraduationCap className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Classe</p>
                  <p className="text-gray-800 font-medium">{selectedStudent.classe?.name || 'Non assigné'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <CalendarIcon className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Date de naissance</p>
                  <p className="text-gray-800 font-medium">{new Date(selectedStudent.birthDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <User className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Sexe</p>
                  <p className="text-gray-800 font-medium">{selectedStudent.gender === 'M' ? 'Masculin' : 'Féminin'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Mail className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email Parent</p>
                  <p className="text-gray-800 font-medium">{selectedStudent.email || 'Non renseigné'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Phone className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Téléphone</p>
                  <p className="text-gray-800 font-medium">{selectedStudent.phoneNumber || 'Non renseigné'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <MapPin className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Adresse</p>
                  <p className="text-gray-800 font-medium">{selectedStudent.address || 'Non renseignée'}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
                <button className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                    Imprimer fiche
                </button>
                <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Historique Écolage
                </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Students;
