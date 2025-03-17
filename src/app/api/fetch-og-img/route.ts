import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
  }

  try {
    const data = await fetch(url);
    const html = await data.text();
    const $ = cheerio.load(html);
    const ogImage = $('meta[property="og:image"]').attr('content');

    if (ogImage) {
      return NextResponse.json({ image: ogImage }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'OG image not found' }, { status: 404 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch the URL' }, { status: 500 });
  }
}
