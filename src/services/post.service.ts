const URL = import.meta.env.VITE_BACKEND_URL;

export async function listAllPosts() {
  const token = localStorage.getItem("token") || '';
  const response = await fetch(`${URL}/post`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Signup failed');
  }

  const data = await response.json();
  return data;
}

export async function listPostsByUser(name: string) {
  const token = localStorage.getItem("token") || '';
  const response = await fetch(`${URL}/post/find?name=${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Signup failed');
  }

  const data = await response.json();
  return data;
}

export interface NewPostParams {
  title: string;
  content: string;
}

export async function createAPost(post: NewPostParams) {
  const token = localStorage.getItem("token") || '';
  const response = await fetch(`${URL}/post/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(post)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Signup failed');
  }

  const data = await response.json();
  return data;
}