"use client";

import { useFetchImageDetails } from "@/hooks/queries/useFetchImageDetails";
import {
	StyledAuthor,
	StyledAuthorImage,
	StyledAuthorName,
	StyledButton,
	StyledButtonContainer,
	StyledImageContainer,
	StyledImageDetails,
	StyledPhotoDetailsContainer,
	StyledPublishedDate,
} from "./PhotoDetails.styled";
import Image from "next/image";
import moment from "moment";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import AddToCollectionModal from "../AddToCollectionModal/AddToCollectionModal";
import type { Collection } from "@/utils/types";
import {
	CollectionDetail,
	CollectionItem,
	StyledButtonHover,
	StyledCollectionThumbnail,
} from "../AddToCollectionModal/AddToCollectionModal.styled";
import { useRemovePhotoFromCollection } from "@/hooks/mutations/useRemovePhotoFromCollection";

const PhotoDetails = ({ id }: { id: string }) => {
	const { data } = useFetchImageDetails({ id });
	const { isDarkMode } = useTheme();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { deleteFromCollection } = useRemovePhotoFromCollection(id);

	const handleRemoveFromCollection = async (collectionId: string) => {
		await deleteFromCollection({ collectionId, photoId: id });
	};
	return (
		<StyledPhotoDetailsContainer>
			{data && (
				<>
					<StyledImageContainer>
						<Image
							src={data?.url}
							alt={data?.alt_description}
							layout="responsive"
							width={data?.width}
							height={data?.height}
						/>
					</StyledImageContainer>
					<StyledImageDetails>
						<StyledAuthor>
							<StyledAuthorImage>
								<Image
									src={data?.author.profileImage}
									alt={data?.author.name}
									width={50}
									height={50}
								/>
							</StyledAuthorImage>
							<StyledAuthorName href={data.author.profileUrl} target="_blank">
								{data.author.name}
							</StyledAuthorName>
						</StyledAuthor>
						<StyledPublishedDate>
							Published on {moment(data.publishedAt).format("MMMM DD, YYYY")}
						</StyledPublishedDate>
						<StyledButtonContainer>
							<StyledButton onClick={() => setIsModalOpen(true)}>
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
							</StyledButton>
							<StyledButton onClick={() => window.open(data.downloadUrl)}>
								{isDarkMode ? (
									<Image
										src="/down arrow dark.svg"
										alt="download"
										width={20}
										height={20}
									/>
								) : (
									<Image
										src="/down arrow.svg"
										alt="download"
										width={20}
										height={20}
									/>
								)}
								Download
							</StyledButton>
						</StyledButtonContainer>
						{data.collections.length > 0 && (
							<>
								<h2>Collections</h2>
								{data.collections.map((collection: Collection) => (
									<CollectionItem
										key={collection._id}
										onClick={() => handleRemoveFromCollection(collection._id)}
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
													src="/Remove dark.svg"
													alt="remove from collection"
													width={20}
													height={20}
												/>
											) : (
												<Image
													src="/Remove.svg"
													alt="remove from collection"
													width={20}
													height={20}
												/>
											)}
											Remove
										</StyledButtonHover>
									</CollectionItem>
								))}
							</>
						)}
					</StyledImageDetails>
				</>
			)}
			<AddToCollectionModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				imageId={id}
			/>
		</StyledPhotoDetailsContainer>
	);
};

export default PhotoDetails;
