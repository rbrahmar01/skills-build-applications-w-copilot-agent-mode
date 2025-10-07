export async function fetchData(endpoint) {
  const codeName = process.env.REACT_APP_CODESPACE_NAME;
  const base = codeName ? `https://${codeName}-8000.app.github.dev/api` : '/api';
  const url = `${base}/${endpoint}/`;
  console.log(`[fetchData] Fetching: ${url}`);
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) {
    console.error(`Request failed ${res.status}`);
    throw new Error(`Failed ${res.status}`);
  }
  const data = await res.json();
  console.log(`[fetchData] Raw data for ${endpoint}:`, data);
  if (data && typeof data === 'object' && Array.isArray(data.results)) {
    return data.results;
  }
  return data;
}
