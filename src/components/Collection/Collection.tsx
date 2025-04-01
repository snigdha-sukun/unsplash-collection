"use client";
import { useFetchCollection } from "@/hooks/queries/useFetchCollection";
import { StyledCollectionContainer } from "./Collection.styled";
import { StyledHeading } from "../Collections/Collections.styled";
import {
	ImageGridContainer,
	ImageWrapper,
} from "../SearchResult/SearchResult.styled";
import Image from "next/image";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { redirect } from "next/navigation";
import type { ImageType } from "@/utils/types";

const Collection = ({ id }: { id: string }) => {
	const { data } = useFetchCollection({ id });
	const windowDimensions = useWindowDimensions();
	let numberOfColumns = 4;
	if ((windowDimensions.width ?? 0) <= 480) {
		numberOfColumns = 1;
	} else if ((windowDimensions.width ?? 0) <= 768) {
		numberOfColumns = 2;
	}

	const handleClick = (id: string) => {
		redirect(`/photos/${id}`);
	};

	return (
		<StyledCollectionContainer>
			{data && (
				<>
					<StyledHeading>{data.name}</StyledHeading>
					<ImageGridContainer
						$columns={
							data.images.length > 4 || numberOfColumns < 4
								? numberOfColumns
								: data.images.length
						}
					>
						{data?.images?.map((image: ImageType) => (
							<ImageWrapper
								key={image.unsplashId}
								$ratio={image.width / image.height}
								onClick={() => handleClick(image.unsplashId)}
							>
								<Image
									src={image.url}
									alt={image.alt_description || ""}
									fill
									style={{ objectFit: "cover" }}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									quality={80}
								/>
							</ImageWrapper>
						))}
					</ImageGridContainer>
				</>
			)}
		</StyledCollectionContainer>
	);
};

export default Collection;
