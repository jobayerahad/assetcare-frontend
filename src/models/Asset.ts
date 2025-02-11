import { Schema, Model, model, models } from 'mongoose'

import { TAsset } from '@types'

const AssetSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    remarks: String
  },
  { versionKey: false }
)

const Asset: Model<TAsset> = models.Asset || model<TAsset>('Asset', AssetSchema)

export default Asset
