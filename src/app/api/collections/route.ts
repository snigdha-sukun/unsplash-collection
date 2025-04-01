import { NextResponse } from "next/server";
import dbConnect from "@/utils/MongodbConnect";
import CollectionModel from "@/models/CollectionModel";
import ImageModel from "@/models/ImageModel";

export async function GET() {
	await dbConnect();
	const collections = await CollectionModel.find()
		.populate({
			path: "images",
			select: "unsplashId url",
			model: ImageModel
		})
		.lean();
	return NextResponse.json(collections);
}

export async function POST(request: Request) {
	await dbConnect();
	const body = await request.json();
	const collection = await CollectionModel.create(body);
	return NextResponse.json(collection, { status: 201 });
}
