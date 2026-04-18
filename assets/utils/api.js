import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const StudentService = {
  getAll: () => api.get('/students'),
  get: (id) => api.get(`/students/${id}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
};

export const FeeService = {
  getAll: (params) => api.get('/fees', { params }),
  getUnpaid: (month, year) => api.get('/fees', {
    params: { month, year, isPaid: false }
  }),
  markAsPaid: (id) => api.patch(`/fees/${id}`, { isPaid: true }, {
    headers: { 'Content-Type': 'application/merge-patch+json' }
  }),
};

export const NewsService = {
  getAll: () => api.get('/news'),
};

export const AccountingService = {
  getAll: () => api.get('/accounting_movements'),
  create: (data) => api.post('/accounting_movements', data),
};

export default api;
