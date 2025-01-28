// src/api/space.js
import api from './api';

export const fetchSpaces = async () => {
  try {
    const response = await api.get('/api/spaces');
    return response.data.map((space) => ({
      id: space.spaceId,
      title: space.sname,
      coverType: space.sthumb,
      isPrimary: space.isPrimary,
      isPublic: space.isPublic,
    }));
  } catch (error) {
    console.error('Error fetching spaces:', error);
    return [];
  }
};
