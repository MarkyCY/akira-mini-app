import * as cheerio from 'cheerio'

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const data = await fetch(url)
    const html = await data.text()

    const $ = cheerio.load(html);
    const ogImage = $('meta[property="og:image"]').attr('content');

    if (ogImage) {
      return res.status(200).json({ image: ogImage });
    } else {
      return res.status(404).json({ error: 'OG image not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch the URL' });
  }
}