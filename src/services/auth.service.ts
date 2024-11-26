interface SignupParams {
  email: string;
  password: string;
  name: string;
}

const URL = import.meta.env.VITE_BACKEND_URL;

export async function signin(params: Partial<SignupParams>) {
  try {
    const response = await fetch(`${URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }

    const data = await response.json();
    const accessToken = data.body.acessToken;

    if (!accessToken) return;

    localStorage.setItem("token", accessToken);
    return data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
}

export async function signup(params: SignupParams) {
  try {
    const response = await fetch(`${URL}/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
}
