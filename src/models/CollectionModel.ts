import { Schema, model, models } from "mongoose";

const CollectionSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		maxlength: 50,
	},
	coverImage: { type: String },
	images: [
		{
			type: Schema.Types.ObjectId,
			ref: "Image",
		},
	],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

CollectionSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

CollectionSchema.index({ name: 1 });
CollectionSchema.index({ coverImage: 1 });
CollectionSchema.index({ images: 1 });

export default models.Collection ||  model("Collection", CollectionSchema);