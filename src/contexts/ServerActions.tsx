"use server";

export const fetchUser = async (token: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${API_URL}/users/me/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Credenciales incorrectas');
        } else {
            throw new Error('Error al obtener los datos');
        }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (user_id: number) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const GLOBAL_PASS = process.env.GLOBAL_PASS;
  try {
    const response = await fetch(`${API_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: `grant_type=password&username=${user_id}&user_id=${user_id}&password=${GLOBAL_PASS}`,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.detail || 'Error en la autenticación' };
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

export const answerChatJoinRequest = async (queryId: string, result: "approve" | "decline" | "queue") => {
  const BOT_TOKEN = process.env.BOT_TOKEN;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerChatJoinRequestQuery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        chat_join_request_query_id: queryId,
        result,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error answering chat join request:", error);
    throw error;
  }
};