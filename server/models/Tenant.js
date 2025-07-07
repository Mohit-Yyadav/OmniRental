import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
   name: String,
  description: String,
  address: String,
  sell: Boolean,
  rent: Boolean,
  parking: Boolean,
  furnished: Boolean,
  offer: Boolean,
  beds: Number,
  baths: Number,
  price: Number,
  imageUrls: [String] // will store filenames or Cloudinary links
});

export default mongoose.model("Tenant", tenantSchema);