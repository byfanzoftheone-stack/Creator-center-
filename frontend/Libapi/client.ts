// frontend/lib/api-client.ts
export type Task = {
  id: string
  title: string
  status: string
  priority: number
  due_date?: string
}

export type Stats = {
  productivity_score: number
  done_today: number
  doing: number
  todo: number
}

export const api = {
  login: async (email: string, password: string) => {
    return { access_token: "mock-token" }
  },
  register: async (email: string, password: string) => {
    return { access_token: "mock-token" }
  },
  stats: async (): Promise<Stats> => {
    return { productivity_score: 50, done_today: 3, doing: 2, todo: 5 }
  },
  listTasks: async (): Promise<Task[]> => {
    return [
      { id: "1", title: "Sample Task", status: "todo", priority: 1 },
      { id: "2", title: "Another Task", status: "doing", priority: 2 },
    ]
  },
}
