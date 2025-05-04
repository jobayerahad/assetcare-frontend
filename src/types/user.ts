export type Employee = {
  empId: number
  name: string
  email: string
  avatar: string
  cellNo: string
  department: string
  designation: string
  unit: string
  branch: {
    code: string
    name: string
  }
  role: 'user' | 'operator' | 'admin'
}

export type SessionUser = Employee & {
  id: string
  access_token: string
}
