export type Collection = {
	_id: string;
	name: string;
	coverImage: string;
    images: ImageType[];
}

export type ImageType = {
		unsplashId: string;
		url: string;
		alt_description: string;
		width: number;
		height: number;
	}