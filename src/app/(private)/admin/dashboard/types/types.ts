export interface DashboardData {
  users: Users
  orders: Orders
  emis: Emis
  incomesales: Incomesales
}

interface Users {
  total: number
  verified: number
  unverified: number
  oauth: number
  email: number
}

interface Orders {
  total: number
  completed: number
  pending: number
}

interface Emis {
  total: number
  completed: number
  pending: number
}

interface Incomesales {
  income: number
  sales: number
}
