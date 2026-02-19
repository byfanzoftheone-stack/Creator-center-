// frontend/lib/api-client.ts
export interface Task {
  id: string
  title: string
  status: string
  priority: number
  due_date?: string
}

export interface Stats {
  productivity_score: number
  done_today: number
  doing: number
  todo: number
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("auth_token")
  const res = await fetch(`${BASE_URL}/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
      ...(options?.headers || {}),
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "API request failed")
  }
  return res.json()
}

export const api = {
  login: (email: string, password: string) =>
    request<{ access_token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string) =>
    request<{ access_token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  listTasks: () => request<Task[]>("/tasks"),
  stats: () => request<Stats>("/stats"),
}
