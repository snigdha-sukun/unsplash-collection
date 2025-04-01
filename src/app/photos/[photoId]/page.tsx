import PhotoDetails from "@/components/PhotoDetails/PhotoDetails";

const PhotoDetailsPage = async ({
    params,
}: {
    params: Promise<{ photoId: string }>;
}) => {
    const { photoId } = await params;
    return <PhotoDetails id={photoId} />;
};
export default PhotoDetailsPage;