import CollectionModel from "@/models/CollectionModel";
import ImageModel from "@/models/ImageModel";
import { NextResponse, type NextRequest } from "next/server";
import dbConnect from "@/utils/MongodbConnect";

export async function POST(
	req: NextRequest,
	{ params }: { params: { collectionId: string } },
) {
	const { collectionId } = params;
	const { photoId } = await req.json();
	await dbConnect();

	const image = await ImageModel.findOne({ unsplashId: photoId }, "_id url");

	if (!image) {
		return new NextResponse(JSON.stringify({ error: "Image not found" }), {
			status: 404,
		});
	}

	const collection = await CollectionModel.findById(collectionId);
	const needsCoverImage = !collection?.coverImage;

	await Promise.all([
		ImageModel.findOneAndUpdate(
			{ unsplashId: photoId },
			{ $addToSet: { collections: collectionId } },
		),
		CollectionModel.findByIdAndUpdate(collectionId, {
			$addToSet: { images: image._id },
			...(needsCoverImage && { $set: { coverImage: image.url } }),
		}),
	]);

	return new NextResponse(JSON.stringify({ success: true }), {
		status: 200,
	});
}
