import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customer: {
         name: { type: String, required: true },
    phone: { type: String, required: true }, 
    address: { type: String, required: true },
    lastName: {type:String},
    otherInfo:{type:String},
      
    },

    items: [
      {
        title: String,
        price: Number,
        qty: Number,
        image: String,
      }
    ],

     status: {
      type: String,
      enum: ["pending", "delivered"],
      default: "pending",
    },

    total: Number,
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
