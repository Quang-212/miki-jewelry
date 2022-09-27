import { Schema, model, models } from 'mongoose';

const Feedback = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    classify: { type: String },
    rating: { type: Number, max: 5, min: 0 },
    comment: { type: String },
    media: {
      type: { type: String, enum: ['image', 'video'] },
      url: { type: String },
      public_id: { type: String },
    },
  },
  {
    timestamps: true,
  },
);
export default models.Feedback || model('Feedback', Feedback);
