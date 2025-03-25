import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { code, codeVerifier, redirectUri } = await req.json();

    if (!code || !codeVerifier || !redirectUri) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }

    const tokenResponse = await axios.post(
      'https://myanimelist.net/v1/oauth2/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_MAL_CLIENT_ID as string,
        client_secret: process.env.MAL_CLIENT_SECRET as string,
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return NextResponse.json(tokenResponse.data, { status: 200 });
  } catch (error: any) {
    console.error('Error obteniendo tokens:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Error obteniendo tokens' },
      { status: 500 }
    );
  }
}

// Opcionalmente, para rechazar métodos HTTP no permitidos:
export async function GET(req: NextRequest) {
  return NextResponse.json(
    { error: `Método GET no permitido` },
    { status: 405 }
  );
}
