import * as yup from 'yup'

export const assetFormSchema = yup.object().shape({
  branch_id: yup.string().required('Branch is required'),

  division_id: yup
    .string()
    .nullable()
    .when('branch_id', {
      is: (val: string) => val === '1',
      then: (schema) => schema.required('Division is required when branch is Head Office'),
      otherwise: (schema) => schema.notRequired()
    }),

  category: yup.string().required('Category is required'),

  product_id: yup.string().nullable().required('Product is required'),

  model: yup.string().required('Model is required'),

  serial_number: yup.string().required('Serial number is required'),

  status: yup.string().oneOf(['active', 'inactive'], 'Invalid status').required('Status is required'),

  current_location_type: yup
    .string()
    .oneOf(['Branch', 'Division', 'Vendor'], 'Invalid location type')
    .required('Location type is required'),

  current_location_id: yup.string().required('Location ID is required'),

  remarks: yup.string().nullable()
})
