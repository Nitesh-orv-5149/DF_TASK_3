import { Schema, model, models } from "mongoose";

export const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number },
    role: { type: String, default: "user", enum: ["user", "vendor", "admin"] },
    amount: { type: Number, default: 2000 },
    bookingIds: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  },
  {
    collection: "Users",
  }
);

const User = models.User || model("User", UserSchema);

export default User;
