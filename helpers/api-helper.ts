const apiUrl = 'https://tt-shoping.firebaseio.com';
const headers = {
  'Content-Type': 'application/json',
};

const appFetch = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  try {
    const response = await fetch(input, init);

    if (!response.ok) {
      console.log(response.status);
      throw new Error('Error while communicating with server!');
    }

    return response;
  } catch (err) {
    //log error;
    console.log(err);
    throw err;
  }
};

export default {
  get: async (apiPath: string) => {
    const response = await appFetch(`${apiUrl}/${apiPath}.json`, {
      method: 'GET',
      headers,
    });

    return await response.json();
  },
  post: async (apiPath: string, data: any) => {
    const url =
      apiPath.indexOf('http') === 0 ? apiPath : `${apiUrl}/${apiPath}.json`;
    const response = await appFetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    return await response.json();
  },
  patch: async (apiPath: string, data: any) => {
    return await appFetch(`${apiUrl}/${apiPath}.json`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });
  },
  delete: async (apiPath: string) => {
    return await appFetch(`${apiUrl}/${apiPath}.json`, {
      method: 'DELETE',
      headers,
    });
  },
};
