import CollectionModel from "@/models/CollectionModel";
import ImageModel from "@/models/ImageModel";
import type { NextRequest } from "next/server";
import dbConnect from "@/utils/MongodbConnect";

export async function DELETE(
	req: NextRequest,
	context: { params: { photoId: string; collectionId: string } },
) {
	const { photoId, collectionId } = context.params;

	await dbConnect();

	const image = await ImageModel.findOne({ unsplashId: photoId }, "_id url");
	const collection = await CollectionModel.findById(collectionId);
	const removeCoverImage = collection?.coverImage === image?.url;

	await Promise.all([
		ImageModel.findOneAndUpdate(
			{ unsplashId: photoId },
			{
				$pull: { collections: collectionId },
			},
		),
		CollectionModel.findByIdAndUpdate(collectionId, {
			$pull: { images: image?._id },
			...(removeCoverImage && { $unset: { coverImage: "" } }),
		}),
	]);
}
