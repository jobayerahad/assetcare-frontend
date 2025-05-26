import * as yup from 'yup'

export const assetItemSchema = yup.object({
  category: yup.string().required('Category is required'),

  product_id: yup.string().required('Product is required'),

  brand_id: yup.string().required('Brand is required'),

  model: yup.string().required('Model is required').max(100, 'Model must be at most 100 characters'),

  remarks: yup.string().nullable().max(500, 'Remarks must be at most 500 characters')
})
