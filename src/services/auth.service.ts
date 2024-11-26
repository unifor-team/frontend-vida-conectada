interface SignupParams {
  email: string;
  password: string;
  name: string;
}

const URL = import.meta.env.VITE_BACKEND_URL;

<<<<<<< HEAD
export async function signup(params: SignupParams) { //método para fazer cadastro
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

export async function signin(params: Partial<SignupParams>) { //método para fazer login
=======
export async function signin(params: Partial<SignupParams>) {
>>>>>>> 4ed50d6ee0521e048a0bcf96e6d33f1269e105d6
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
