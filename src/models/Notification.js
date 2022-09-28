import { Schema, model, models } from 'mongoose';

const Notification = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['system', 'feedback', 'order'], required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false, required: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
export default models.Notification || model('Notification', Notification);
