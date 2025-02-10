import { Schema, Model, model, models } from 'mongoose'

import { TRepairCost } from '@types'

const RepairCostSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    partName: {
      type: String,
      required: true
    },

    repairCost: {
      type: Number,
      required: true
    },

    remarks: String
  },
  { versionKey: false, collection: 'repair_costs' }
)

const RepairCost: Model<TRepairCost> = models.RepairCost || model<TRepairCost>('RepairCost', RepairCostSchema)

export default RepairCost
