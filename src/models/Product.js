import { model, models, Schema } from 'mongoose';
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Product = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, slug: 'name', unique: true },
    description: String,
    images: [
      {
        url: String,
        public_id: String,
        type: {
          type: String,
          enum: ['primary', 'secondary'],
        },
      },
    ],
    // category: {
    //   type: String,
    //   enum: ['bracelet', 'earring', 'necklace', 'ring'],
    //   required: true,
    //   lowercase: true,
    // },
    category: [
      {
        type: String,
        required: true,
        lowercase: true,
      },
    ],

    visibilityStatus: {
      type: String,
      enum: ['published', 'hidden'],
      required: true,
    },
    discount: Number,
    coupon: String,
    stocks: [
      {
        size: String,
        price: Number,
        color: String,
        quantity: Number,
        sku: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default models.Product || model('Product', Product);
