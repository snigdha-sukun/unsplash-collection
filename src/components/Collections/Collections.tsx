"use client";
import { useFetchCollections } from "@/hooks/queries/useFetchCollections";
import {
	StyledAnchor,
	StyledCollection,
	StyledCollectionAddNew,
	StyledCollectionDescription,
	StyledCollectionImage,
	StyledCollectionName,
	StyledCollections,
	StyledCollectionsContainer,
	StyledHeading,
	StyledSubtitle,
} from "./Collections.styled";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import AddCollectionModal from "../AddCollection/AddCollectionModal";
import type { Collection } from "@/utils/types";
import { redirect } from "next/navigation";

const Collections = () => {
	const { data: collections } = useFetchCollections();
	const { isDarkMode } = useTheme();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleClick = (collectionId: string) => {
		redirect(`/collections/${collectionId}`);
	};

	return (
		<StyledCollectionsContainer>
			<StyledHeading>Collections</StyledHeading>
			<StyledSubtitle>
				Explore the world through collections of beautiful photos free to use
				under the{" "}
				<StyledAnchor
					href="https://unsplash.com/license"
					target="_blank"
					rel="noreferrer"
				>
					Unsplash License
				</StyledAnchor>
				.
			</StyledSubtitle>
			<StyledCollections>
				{collections?.map((collection: Collection) => (
					<StyledCollection
						key={collection._id}
						onClick={() => handleClick(collection._id)}
					>
						<StyledCollectionImage>
							{collection.coverImage && (
								<Image
									src={collection.coverImage}
									alt={collection.name}
									fill
									style={{ objectFit: "cover" }}
								/>
							)}
						</StyledCollectionImage>
						<StyledCollectionName>{collection.name}</StyledCollectionName>
						<StyledCollectionDescription>
							{collection.images.length} photos
						</StyledCollectionDescription>
					</StyledCollection>
				))}
				<StyledCollectionAddNew onClick={() => setIsModalOpen(true)}>
					{isDarkMode ? (
						<Image
							src="/Plus-add dark.svg"
							alt="add to collection"
							width={20}
							height={20}
						/>
					) : (
						<Image
							src="/Plus-add.svg"
							alt="add to collection"
							width={20}
							height={20}
						/>
					)}
					Add new collection
				</StyledCollectionAddNew>
			</StyledCollections>
			<AddCollectionModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</StyledCollectionsContainer>
	);
};

export default Collections;
