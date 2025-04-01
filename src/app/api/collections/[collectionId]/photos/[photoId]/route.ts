import CollectionModel from "@/models/CollectionModel";
import ImageModel from "@/models/ImageModel";
import type { NextRequest } from "next/server";
import dbConnect from "@/utils/MongodbConnect";

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { photoId: string; collectionId: string } },
) {
	const { photoId, collectionId } = params;
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
