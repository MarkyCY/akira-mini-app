import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token es requerido." });
    }

    try {
      const response = await axios.post(
        "https://myanimelist.net/v1/oauth2/token",
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: process.env.NEXT_PUBLIC_MAL_CLIENT_ID,
          client_secret: process.env.MAL_CLIENT_SECRET,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return res.status(200).json(response.data);
    } catch (error) {
      console.error("Error renovando token:", error.response?.data || error.message);
      return res.status(500).json({ error: "Error renovando token" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}
