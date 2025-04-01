import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({
	unsplashId: { type: String, required: true, unique: true },
	url: { type: String, required: true },
	downloadUrl: { type: String, required: true },
	alt_description: { type: String },
	width: { type: Number, required: true },
	height: { type: Number, required: true },
	author: {
		name: { type: String, required: true },
		profileUrl: { type: String },
        profileImage: { type: String },
	},
	publishedAt: { type: Date, required: true },
	collections: [
		{
			type: Schema.Types.ObjectId,
			ref: "Collection",
		},
	],
	createdAt: { type: Date, default: Date.now },
});

ImageSchema.index({ url: 1 });

export default models.Image || model("Image", ImageSchema);