import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String },
    email: String,
    //more field here
  },

  {
    timestamps: true,
  }
);

export default models.User || model('User', UserSchema);
