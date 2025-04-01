import Collection from "@/components/Collection/Collection";

const CollectionPage = async ({
	params,
}: {
	params: Promise<{ collectionId: string }>;
}) => {
    const { collectionId } = await params;
	return <Collection id={collectionId} />;
};

export default CollectionPage;