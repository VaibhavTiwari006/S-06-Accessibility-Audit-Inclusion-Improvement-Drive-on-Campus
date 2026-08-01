import api from './api';

const userService = {
  updateUser: async (id, fullName) => {
    const response = await api.put(`/users/${id}`, { fullName });
    return response.data.data;
  }
};

export default userService;
