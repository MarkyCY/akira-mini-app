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

import { headers } from "next/headers";

export const answerChatJoinRequest = async (
  queryId: string,
  result: "approve" | "decline" | "queue"
) => {
  const BOT_TOKEN = process.env.BOT_TOKEN!;
  const ADMIN_CHAT_ID = 873919300;

  try {
    // Obtener IP real
    const h = await headers();

    const ip =
      h.get("cf-connecting-ip") ||
      h.get("x-real-ip") ||
      h.get("x-forwarded-for")?.split(",")[0].trim() ||
      "Desconocida";

    // Consultar ip.guide
    let ipInfo: any = {};

    if (ip !== "Desconocida") {
      try {
        const res = await fetch(`https://ip.guide/${ip}`, {
          cache: "no-store",
        });

        ipInfo = await res.json();
      } catch (e) {
        ipInfo = {
          error: "No se pudo consultar ip.guide",
        };
      }
    }

    // Enviar mensaje al administrador
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        parse_mode: "Markdown",
        text:
          "Datos del nuevo usuario:\n```json\n" +
          JSON.stringify(ipInfo, null, 2) +
          "\n```",
      }),
    });

    // Responder la solicitud
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/answerChatJoinRequestQuery`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          chat_join_request_query_id: queryId,
          result,
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};