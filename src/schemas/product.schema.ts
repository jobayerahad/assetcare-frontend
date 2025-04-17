import * as yup from 'yup'

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required('Product name is required')
    .min(2, 'Product name must be at least 2 characters')
    .max(100, 'Product name must be at most 100 characters'),

  description: yup.string().nullable().max(1000, 'Description must be at most 1000 characters'),

  category: yup.string().required('Category is required')
})
