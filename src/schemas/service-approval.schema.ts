import * as yup from 'yup'

export const serviceApprovalSchema = yup.object().shape({
  category: yup.string().nullable().required('Category is required'),
  product: yup.string().nullable().required('Product is required'),
  component: yup.string().nullable().required('Component is required'),
  vendor: yup.string().nullable().required('Vendor is required'),
  cost: yup.number().typeError('Cost must be a number').required('Cost is required'),
  year: yup
    .date()
    .typeError('Invalid year format')
    .min(new Date(2013, 0, 1), 'Year cannot be before 2013')
    .max(new Date(new Date().getFullYear(), 11, 31), 'Year cannot be in the future')
    .required('Year is required'),
  is_selected: yup.string().oneOf(['0', '1'], 'Invalid selection').required('Selection status is required'),
  description: yup.string().max(1000, 'Description is too long').nullable()
})
