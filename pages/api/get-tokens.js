import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { code, codeVerifier, redirectUri } = req.body;

    if (!code || !codeVerifier || !redirectUri) {
      return res.status(400).json({ error: "Faltan parámetros requeridos" });
    }

    try {
      const response = await axios.post(
        "https://myanimelist.net/v1/oauth2/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.NEXT_PUBLIC_MAL_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_MAL_CLIENT_SECRET,
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return res.status(200).json(response.data);
    } catch (error) {
      console.error("Error obteniendo tokens:", error.response?.data || error.message);
      return res.status(500).json({ error: "Error obteniendo tokens" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}
