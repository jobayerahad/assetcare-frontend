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
  product: yup.string().required('Product is required'),

  item_id: yup.string().nullable().required('Item is required'),

  serial_number: yup.string().required('Serial number is required'),

  status: yup.string().oneOf(['active', 'inactive'], 'Invalid status').required('Status is required'),

  remarks: yup.string().nullable()
})

export const assetTransferSchema = yup.object().shape({
  asset_id: yup.string().required('Asset is required'),

  from_location_type: yup
    .string()
    .oneOf(['branch', 'division', 'vendor'], 'Invalid location type')
    .required('From location type is required'),

  from_location_id: yup.string().required('From location is required'),

  to_location_type: yup
    .string()
    .oneOf(['branch', 'division', 'vendor'], 'Invalid location type')
    .required('To location type is required'),

  to_location_id: yup.string().required('To location is required'),

  transfer_type: yup
    .string()
    .oneOf(['sent_for_repair', 'returned_after_repair'], 'Invalid transfer type')
    .required('Transfer type is required'),

  transfer_date: yup.date().typeError('Transfer date is required').required('Transfer date is required'),

  received_by: yup.string().nullable().default('').max(255, 'Received by is too long'),

  remarks: yup.string().nullable().default('').max(1000, 'Remarks is too long'),

  // Optional frontend-only fields for internal use
  category: yup.string().required('Category is required'),
  product: yup.string().required('Product is required')
})
