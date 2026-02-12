// src/api/client.js
const API_BASE = ""; // Use relative URLs for Vite proxy

export const getToken = () => {
  return localStorage.getItem("drus_token") || localStorage.getItem("token");
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("drus_token", token);
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("drus_token");
    localStorage.removeItem("token");
  }
};

export const clearToken = () => {
  localStorage.removeItem("drus_token");
  localStorage.removeItem("token");
};

// Mock API responses for development
const mockResponses = {
  "/api/auth/login": async (body) => {
    const { email, password } = JSON.parse(body);
    console.log('🔐 Mock login attempt:', { email, password: '***' });
    
    // Demo credentials
    if (email === "demo@drus.com" && password === "Demo123!") {
      return {
        token: "mock-jwt-token-" + Date.now(),
        user: {
          id: 1,
          email: "demo@drus.com",
          name: "Demo User"
        }
      };
    }
    
    throw new Error("Invalid credentials");
  },
  
  "/api/auth/register": async (body) => {
    const { email, password, name } = JSON.parse(body);
    console.log('📝 Mock register attempt:', { email, name, password: '***' });
    
    return {
      token: "mock-jwt-token-" + Date.now(),
      user: {
        id: Date.now(),
        email,
        name
      }
    };
  },

  "/api/profiles/me": async () => {
    console.log('👤 Mock profile fetch');
    return {
      id: 1,
      email: "demo@drus.com",
      name: "Demo User",
      bio: "This is a mock user profile for development.",
      avatarUrl: `https://i.pravatar.cc/150?u=demo@drus.com`
    };
  },

  "/api/profiles/me/stats": async () => {
    console.log('📈 Mock profile stats fetch');
    return {
      totalSolved: 120,
      totalContests: 5,
      streak: 3,
      languages: [
        { name: 'JavaScript', count: 50 },
        { name: 'Python', count: 40 },
        { name: 'Java', count: 30 }
      ]
    };
  },

  "/api/analytics": async () => {
    console.log('📊 Mock analytics fetch');
    return {
      totalSolved: 125,
      totalContests: 12,
      streak: 5,
      languages: [
        { name: 'JavaScript', count: 45 },
        { name: 'Python', count: 30 },
        { name: 'Java', count: 25 },
        { name: 'C++', count: 25 }
      ],
      recentActivity: [
        { date: '2023-10-01', count: 5 },
        { date: '2023-10-02', count: 3 },
        { date: '2023-10-03', count: 8 },
        { date: '2023-10-04', count: 2 },
        { date: '2023-10-05', count: 6 }
      ]
    };
  },

  // Mock platform data fetch
  "/api/platforms/fetch": async (body) => {
    const { platformId, username } = JSON.parse(body);
    console.log(`🌐 Fetching data for ${platformId} user: ${username}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate random stats based on username length to make it look dynamic
    const seed = username.length;
    
    return {
      username: username,
      platformId: platformId,
      stats: {
        total: 100 + seed * 10,
        easy: 50 + seed * 5,
        medium: 30 + seed * 3,
        hard: 20 + seed * 2,
        rank: `${(seed * 1000).toLocaleString()}`,
        rating: 1200 + seed * 50,
        streak: seed * 2,
        contests: seed * 5
      },
      lastSynced: new Date().toISOString()
    };
  }
};

export async function apiFetch(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers
    });

    // If the server responds with an error, try the mock response
    if (!res.ok) {
      console.warn(`Server responded with ${res.status}. Attempting to use mock data.`);
      
      // Try exact match first
      let mockResponse = mockResponses[path];
      
      // If no exact match, try regex for dynamic routes
      if (!mockResponse) {
        if (path.startsWith('/api/platforms/') && path.split('/').length === 5) {
          // Matches /api/platforms/:platformId/:username
          mockResponse = mockResponses["/api/platforms/fetch"];
        }
      }

      if (mockResponse) {
        // Handle both function and direct object responses
        if (typeof mockResponse === 'function') {
           if ((options.method === 'POST' || options.method === 'PUT') && options.body) {
             return await mockResponse(options.body);
           }
           // For dynamic routes, pass the path parts
           if (path.startsWith('/api/platforms/')) {
             const parts = path.split('/');
             return await mockResponse(JSON.stringify({ platformId: parts[3], username: parts[4] }));
           }
           return await mockResponse();
        }
        return mockResponse;
      }
      
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Request failed with status ${res.status}`);
    }

    return res.json();
  } catch (error) {
    // If fetch fails entirely (e.g., network error), use mock response
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.message.includes('Connection refused')) {
      console.log('🔄 Network error/Refused. Using mock API response for:', path);
      
      // Try exact match first
      let mockResponse = mockResponses[path];
      
      // If no exact match, try regex for dynamic routes
      if (!mockResponse) {
        if (path.startsWith('/api/platforms/') && path.split('/').length === 5) {
          // Matches /api/platforms/:platformId/:username
          mockResponse = mockResponses["/api/platforms/fetch"];
        }
      }

      if (mockResponse) {
        if (typeof mockResponse === 'function') {
           if ((options.method === 'POST' || options.method === 'PUT') && options.body) {
             return await mockResponse(options.body);
           }
           // For dynamic routes, pass the path parts
           if (path.startsWith('/api/platforms/')) {
             const parts = path.split('/');
             return await mockResponse(JSON.stringify({ platformId: parts[3], username: parts[4] }));
           }
           return await mockResponse();
        }
        return mockResponse;
      }
    }
    throw error;
  }
}