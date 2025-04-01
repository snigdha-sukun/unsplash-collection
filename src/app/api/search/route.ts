import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("query");
	const page = searchParams.get("page") ?? 1;
	const res = await fetch(
		`${process.env.UNSPLASH_API_URI}/search/photos?query=${query}&page=${page}`,
		{
			headers: {
				Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
			},
		},
	);
	const data = await res.json();

	return NextResponse.json({ data });
}
