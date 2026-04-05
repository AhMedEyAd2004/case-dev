import mongoose from "mongoose";
import { z } from "zod";

export const UserValidator = z.object({
  id: z.string(), // ← better-auth's primary key (string, e.g. nanoid)
  email: z.email(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TUSER = z.infer<typeof UserValidator>;

const UserSchema = new mongoose.Schema(
  {},
  {
    strict: false, // ← accepts any fields better-auth already stored
    collection: "user", // ← points to better-auth's existing collection
  },
);

export const User =
  (mongoose.models.user as mongoose.Model<TUSER>) || mongoose.model<TUSER>("user", UserSchema);
