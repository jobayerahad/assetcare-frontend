import { Schema, Model, model, models } from 'mongoose'

import { TVendor } from '@types'

const VendorSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    remarks: String
  },
  { versionKey: false }
)

const Vendor: Model<TVendor> = models.Vendor || model<TVendor>('Vendor', VendorSchema)

export default Vendor
