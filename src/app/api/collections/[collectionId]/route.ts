import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/MongodbConnect";
import CollectionModel from "@/models/CollectionModel";
import ImageModel from "@/models/ImageModel";

export async function GET(
	req: NextRequest,
	{ params }: { params: { collectionId: string } },
) {
	await dbConnect();
	const { collectionId } = params;
	const collections = await CollectionModel.findById(collectionId)
		.populate({
			path: "images",
			select: "unsplashId alt_description width height url",
			model: ImageModel,
		})
		.lean();
	return NextResponse.json(collections);
}
