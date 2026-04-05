import { CASE_COLORS, FINISH, MATERIALS, MODELS } from "@/validators/option-validator";
import mongoose from "mongoose";
import { z } from "zod";

type CaseColorValues = (typeof CASE_COLORS.options)[number]["value"]; // "black" | "blue" | "rose"
type ModelValues = (typeof MODELS.options)[number]["value"]; // "iPhoneX" | "iPhone11" | ...
type MaterialValues = (typeof MATERIALS.options)[number]["value"]; // "silicon" | "polycarbonate"
type FinishValues = (typeof FINISH.options)[number]["value"]; // "smooth" | "textured"

export const ImageConfigValidator = z.object({
  _id: z.instanceof(mongoose.Types.ObjectId).optional(),
  width: z.number(),
  height: z.number(),
  croppedImageUrl: z.string().optional(),
  imageUrl: z.string(),
  options: z
    .object({
      [CASE_COLORS.name]: z.enum(
        CASE_COLORS.options.map((c) => c.value) as [CaseColorValues, ...CaseColorValues[]],
      ),
      [MODELS.name]: z.enum(MODELS.options.map((m) => m.value) as [ModelValues, ...ModelValues[]]),
      [MATERIALS.name]: z.enum(
        MATERIALS.options.map((m) => m.value) as [MaterialValues, ...MaterialValues[]],
      ),
      [FINISH.name]: z.enum(
        FINISH.options.map((f) => f.value) as [FinishValues, ...FinishValues[]],
      ),
    })
    .optional(),
});

export type TImageConfig = z.infer<typeof ImageConfigValidator>;

const ImageConfig = new mongoose.Schema<TImageConfig>({
  width: { type: Number },
  height: { type: Number },
  options: {
    //zod will validate those
    caseColor: { type: String },
    model: { type: String },
    material: { type: String },
    finish: { type: String },
  },
  imageUrl: { type: String }, //so i can fetch the imageUrl from mongoDb to view it
  croppedImageUrl: { type: String }, //after designing the image on the case in step 2
});

export const ImageConfiguration =
  (mongoose.models.ImageConfig as mongoose.Model<TImageConfig>) ||
  mongoose.model<TImageConfig>("ImageConfig", ImageConfig);
