import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Helper to handle Hydra or plain JSON collections
const handleResponse = (res) => {
    if (!res.data) return [];

    // Handle both 'hydra:member' and 'member'
    const member = res.data['hydra:member'] || res.data['member'];
    if (member) return member;

    // If it's a collection type but no member, it's empty
    const type = res.data['@type'];
    if (type === 'hydra:Collection' || type === 'Collection') {
        return [];
    }

    return res.data;
};

export const StudentService = {
  getAll: (params) => api.get('/students', { params }).then(handleResponse),
  get: (id) => api.get(`/students/${id}`).then(res => res.data),
  create: (data) => api.post('/students', data).then(res => res.data),
  update: (id, data) => api.put(`/students/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/students/${id}`).then(res => res.data),
};

export const FeeService = {
  getAll: (params) => api.get('/fees', { params }).then(handleResponse),
  getUnpaid: (month, year) => api.get('/fees', {
    params: { month, year, isPaid: false }
  }).then(handleResponse),
  markAsPaid: (id) => api.patch(`/fees/${id}`, { isPaid: true }, {
    headers: { 'Content-Type': 'application/merge-patch+json' }
  }).then(res => res.data),
};

export const NewsService = {
  getAll: () => api.get('/news').then(handleResponse),
  create: (data) => api.post('/news', data).then(res => res.data),
};

export const AccountingService = {
  getAll: () => api.get('/accounting_movements').then(handleResponse),
  create: (data) => api.post('/accounting_movements', data).then(res => res.data),
};

export const ClasseService = {
  getAll: () => api.get('/classes').then(handleResponse),
  create: (data) => api.post('/classes', data).then(res => res.data),
};

export default api;
