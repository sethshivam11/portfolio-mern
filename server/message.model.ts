import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    phone: Number
}, {
    timestamps: true
})

export const Message = mongoose.model("Message", messageSchema) 