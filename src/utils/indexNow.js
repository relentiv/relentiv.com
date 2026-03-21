const INDEX_NOW_KEY = 'c01e73255ace33524090571332a787f2';
const BASE_URL = 'https://relentiv.com';

export async function pingIndexNow(urls) {
  const urlList = Array.isArray(urls) ? urls : [urls];

  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        host: 'relentiv.com',
        key: INDEX_NOW_KEY,
        keyLocation: `${BASE_URL}/${INDEX_NOW_KEY}.txt`,
        urlList: urlList.map((url) =>
          url.startsWith('http') ? url : `${BASE_URL}${url}`,
        ),
      }),
    });
  } catch (error) {
    console.error('IndexNow ping failed:', error);
  }
}

export {INDEX_NOW_KEY};
