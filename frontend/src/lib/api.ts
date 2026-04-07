// ═══════════════════════════════════════════
// PixelMind — API Client (FastAPI Bridge)
// ═══════════════════════════════════════════

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiOptions {
  method?: string;
  body?: FormData | string;
  headers?: Record<string, string>;
  token?: string;
}

async function apiCall<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, token } = options;

  const requestHeaders: Record<string, string> = { ...headers };

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  if (typeof body === 'string') {
    requestHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: requestHeaders,
    body,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `API Error: ${response.status}`);
  }

  return response.json();
}

// ── Auth ──
export async function registerUser(email: string, password: string, name: string) {
  return apiCall<{ id: string; email: string }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
}

export async function loginUser(email: string, password: string) {
  return apiCall<{ access_token: string; user: { id: string; email: string; credits: number } }>(
    '/api/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }
  );
}

// ── User ──
export async function getUserProfile(token: string) {
  return apiCall<{ id: string; email: string; name: string; credits: number }>('/api/user/me', {
    token,
  });
}

export async function refillCredits(token: string) {
  return apiCall<{ credits: number; message: string }>('/api/user/credits/refill', {
    method: 'POST',
    token,
  });
}

// ── AI Tools ──
export async function runAITool(
  tool: string,
  formData: FormData,
  token: string,
  onProgress?: (progress: number) => void
): Promise<{ result_url: string; remaining_credits: number; processing_time: number }> {
  // Simulate progress updates
  if (onProgress) {
    const interval = setInterval(() => {
      onProgress(Math.min(90, Math.random() * 30 + 60));
    }, 500);

    try {
      const result = await apiCall<{
        result_url: string;
        remaining_credits: number;
        processing_time: number;
      }>(`/api/ai/${tool}`, {
        method: 'POST',
        body: formData,
        token,
      });
      onProgress(100);
      return result;
    } finally {
      clearInterval(interval);
    }
  }

  return apiCall(`/api/ai/${tool}`, {
    method: 'POST',
    body: formData,
    token,
  });
}

// ── Gallery ──
export async function getGallery(token: string) {
  return apiCall<
    {
      id: string;
      title: string;
      imageUrl: string;
      resultUrl: string;
      toolUsed: string;
      createdAt: string;
    }[]
  >('/api/gallery', { token });
}

export async function saveProject(
  token: string,
  data: { title: string; imageUrl: string; resultUrl: string; toolUsed: string; prompt?: string }
) {
  return apiCall<{ id: string }>('/api/gallery', {
    method: 'POST',
    body: JSON.stringify(data),
    token,
  });
}

// ── Ads ──
export async function logAdImpression(
  token: string,
  data: { adType: string; adBrand?: string; clicked?: boolean }
) {
  return apiCall('/api/ads/impression', {
    method: 'POST',
    body: JSON.stringify(data),
    token,
  });
}
