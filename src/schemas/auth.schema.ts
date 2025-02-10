import * as yup from 'yup'

export const signInSchema = yup.object().shape({
  empId: yup
    .number()
    .typeError('Employee ID should be a number')
    .required('Please enter your employee ID')
    .positive('Employee ID should be a positive number'),

  password: yup
    .string()
    .required('Please enter password')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')

  // password: yup.string().required('Please enter password')
})
