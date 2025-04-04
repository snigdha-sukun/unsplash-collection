"use client";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import {
	CollectionDetail,
	CollectionItem,
	CollectionList,
	ModalHeading,
	StyledButtonHover,
	StyledCollectionThumbnail,
} from "./AddToCollectionModal.styled";
import SearchBar from "../SearchBar/SearchBar";
import { useFetchCollections } from "@/hooks/queries/useFetchCollections";
import { useAddPhotoToCollection } from "@/hooks/mutations/useAddPhotoToCollection";
import Image from "next/image";
import type { Collection } from "@/utils/types";
import { useTheme } from "@/context/ThemeContext";

interface AddToCollectionModalProps {
	readonly isOpen: boolean;
	readonly onClose: () => void;
	readonly imageId: string;
}

const AddToCollectionModal = ({
	isOpen,
	onClose,
	imageId,
}: AddToCollectionModalProps) => {
	const { isDarkMode } = useTheme();
	const [searchTerm, setSearchTerm] = useState("");
	const { data: collections } = useFetchCollections();
	const { addToCollection } = useAddPhotoToCollection(imageId);

	const handleAddToCollection = async (collectionId: string) => {
		await addToCollection({ collectionId, photoId: imageId });
		onClose();
	};

	const collectionsWithoutPhoto: Collection[] = collections?.filter(
		(collection: Collection) => {
			const collectionPhotos = collection.images.map(
				(image) => image.unsplashId,
			);
			return !collectionPhotos.includes(imageId);
		},
	);
	const [filteredCollections, setFilteredCollections] = useState<Collection[]>(
		collectionsWithoutPhoto);

	useEffect(() => {
		const searchedCollection = searchTerm ? collectionsWithoutPhoto?.filter((collection: Collection) =>
				collection.name.toLowerCase().includes(searchTerm.toLowerCase()),
			)
		: collectionsWithoutPhoto;

		setFilteredCollections(searchedCollection);
	}, [searchTerm, collectionsWithoutPhoto]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalHeading>Add to Collection</ModalHeading>
			<SearchBar
				value={searchTerm}
				placeholder="Search collections..."
				handleChange={(e) => setSearchTerm(e.target.value)}
				handleKeyDown={() => {}}
				width="100%"
			/>
			<CollectionList>
				{filteredCollections?.map((collection: Collection) => (
					<CollectionItem
						key={collection._id}
						onClick={() => handleAddToCollection(collection._id)}
					>
						<CollectionDetail>
							<StyledCollectionThumbnail>
								{collection.coverImage && (
									<Image
										src={collection.coverImage}
										alt={collection.name}
										fill
										style={{ objectFit: "cover" }}
									/>
								)}
							</StyledCollectionThumbnail>
							{collection.name}
						</CollectionDetail>
						<StyledButtonHover>
							{isDarkMode ? (
								<Image
									src="/Plus dark.svg"
									alt="add to collection"
									width={20}
									height={20}
								/>
							) : (
								<Image
									src="/Plus.svg"
									alt="add to collection"
									width={20}
									height={20}
								/>
							)}
							Add to Collection
						</StyledButtonHover>
					</CollectionItem>
				))}
			</CollectionList>
		</Modal>
	);
};

export default AddToCollectionModal;
