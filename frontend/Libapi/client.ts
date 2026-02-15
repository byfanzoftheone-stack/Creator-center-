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
  stats: async (): Promise<Stats> => ({
    productivity_score: 42,
    done_today: 3,
    doing: 2,
    todo: 5
  }),
  listTasks: async (): Promise<Task[]> => [
    { id: "1", title: "Task 1", status: "doing", priority: 1, due_date: "2026-02-20" },
    { id: "2", title: "Task 2", status: "todo", priority: 2 }
  ]
}
