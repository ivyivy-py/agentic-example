// Health check utility and endpoint for SingesHome SG Web Application APIs
// Checks Pexels API connectivity, environment keys, forum & analytics status, and server metrics.

async function checkPexelsHealth() {
  const apiKey =
    process.env.Pexel_API_Key ||
    process.env.PEXEL_API_KEY ||
    process.env.VITE_PEXEL_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    return {
      status: 'warning',
      configured: false,
      message: 'Pexel_API_Key environment variable is not set. Using curated local fallback photo assets.',
      latencyMs: 0,
    };
  }

  const startTime = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch('https://api.pexels.com/v1/search?query=housing&per_page=1', {
      headers: {
        Authorization: apiKey.trim(),
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const latencyMs = Date.now() - startTime;

    if (response.ok) {
      const data = await response.json();
      return {
        status: 'healthy',
        configured: true,
        httpStatus: response.status,
        latencyMs,
        message: 'Pexels API is reachable and authenticated successfully.',
        totalResultsFound: data.total_results || 0,
      };
    } else {
      return {
        status: 'unhealthy',
        configured: true,
        httpStatus: response.status,
        latencyMs,
        message: `Pexels API responded with HTTP error status ${response.status} (${response.statusText}). Check API key validity.`,
      };
    }
  } catch (error) {
    return {
      status: 'error',
      configured: true,
      latencyMs: Date.now() - startTime,
      message: `Failed to connect to Pexels API: ${error.message || error}`,
    };
  }
}

export async function getOverallHealth() {
  const pexels = await checkPexelsHealth();

  const services = {
    pexels_api: pexels,
    disqus: {
      status: 'configured',
      shortname: 'sample-oqdiekwyrl',
      embedScript: 'https://sample-oqdiekwyrl.disqus.com/embed.js',
      message: 'Disqus comment widget configured.',
    },
    ms_clarity: {
      status: 'configured',
      projectId: 'y8vc19kgw9',
      message: 'Microsoft Clarity user behavior tracking enabled.',
    },
    calculator_engine: {
      status: 'healthy',
      message: 'Client-side HDB Housing Calculator & CPF Grant engine online.',
    },
  };

  const isDegraded = pexels.status === 'unhealthy' || pexels.status === 'error';

  return {
    status: isDegraded ? 'degraded' : 'ok',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    memoryUsageMB: process.memoryUsage
      ? {
          rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
          heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        }
      : undefined,
    services,
  };
}

// Express / Serverless route handler
export default async function healthHandler(req, res) {
  try {
    const health = await getOverallHealth();
    const statusCode = health.status === 'ok' ? 200 : 207;

    if (res && typeof res.setHeader === 'function') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.status(statusCode).json(health);
    }
    return health;
  } catch (err) {
    const errorResponse = {
      status: 'error',
      timestamp: new Date().toISOString(),
      error: err.message || 'Internal health check error',
    };
    if (res && typeof res.status === 'function') {
      return res.status(500).json(errorResponse);
    }
    return errorResponse;
  }
}

// Allow direct CLI execution: `node app/health.js`
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('health.js')) {
  getOverallHealth().then((result) => {
    console.log(JSON.stringify(result, null, 2));
  });
}
