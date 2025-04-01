import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import ImageModel from "@/models/ImageModel";
import dbConnect from "@/utils/MongodbConnect";
import CollectionModel from "@/models/CollectionModel";

export async function GET(
	req: NextRequest,
	{
		params,
	}: {
		params: Promise<{ id: string }>;
	},
) {
	await dbConnect();
	const { id } = await params;
	let image = await ImageModel.findOne({ unsplashId: id })
		.populate({
			path: "collections",
			select: "name coverImage _id",
			model: CollectionModel,
		})
		.lean();

	if (!image) {
		const res = await fetch(`${process.env.UNSPLASH_API_URI}/photos/${id}`, {
			headers: {
				Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
			},
		});
		const data = await res.json();
		const body = {
			unsplashId: data.id,
			url: data.urls.regular,
			downloadUrl: data.links.download,
			author: {
				name: data.user.name,
				profileUrl: data.user.links.html,
				profileImage: data.user.profile_image.large,
			},
			publishedAt: data.created_at,
			collections: [],
			alt_description: data.alt_description,
			width: data.width,
			height: data.height,
		};
		await ImageModel.create(body);
		image = await ImageModel.findOne({ unsplashId: id }).populate({
			path: "collections",
			select: "name coverImage _id",
			model: CollectionModel,
		});
	}

	return NextResponse.json(image);
}
