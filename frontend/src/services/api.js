const rawBaseUrl = import.meta.env.VITE_API_URL || '';
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, '');

async function fetchJson(endpoint, options = {}) {
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${cleanBaseUrl}${formattedEndpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.detail || errorBody.error || `HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the prediction service. Please check that the backend is running.');
    }
    throw error;
  }
}

export const getHealth = () => fetchJson('/api/health');

export const getMetrics = () => fetchJson('/api/metrics');

export const getModelDetails = () => fetchJson('/api/model-details');

export const getInsights = () => fetchJson('/api/insights');

export const predictLoan = (data) => fetchJson('/api/predict', {
  method: 'POST',
  body: JSON.stringify(data)
});

export const getPlotUrl = (filename) => `${cleanBaseUrl}/api/plots/${filename}`;
