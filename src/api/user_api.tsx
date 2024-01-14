import ApiManager from './ApiManager';

export const user_login = async data => {
  try {
    const result = await ApiManager('/api/jwt/Login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    });

    return result;
  } catch (error) {
    return error.response.data;
  }
};
