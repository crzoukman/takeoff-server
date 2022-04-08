import mongoose from "mongoose";


const contactSchema = new mongoose.Schema(
  {
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model('Contact', contactSchema);

export default ContactModel;