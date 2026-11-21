// Small helper around fetch so every page handles errors the same way.
const API_URL = import.meta.env.VITE_API_URL || '';

export function imageUrl(fileName) {
  return `${API_URL}/uploads/${fileName}`;
}

export async function request(path, { method = 'GET', body, user } = {}) {
  const headers = {};

  // the server checks this header to know who is logged in
  if (user) headers['x-user-id'] = user._id;

  let payload = body;
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${path}`, { method, headers, body: payload });

  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    // response had no JSON body
  }

  if (!res.ok) {
    throw new Error((data && data.message) || 'Something went wrong, please try again');
  }
  return data;
}
