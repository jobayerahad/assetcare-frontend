export type Employee = {
  id: string
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
}
