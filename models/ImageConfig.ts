// models/ImageConfig.ts
import mongoose from "mongoose";

const ImageConfigSchema = new mongoose.Schema({
  configId: { type: String },
  fileUrl: { type: String, required: true },
  fileKey: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export const Configuration =
  mongoose.models.ImageConfig || mongoose.model("ImageConfig", ImageConfigSchema);
