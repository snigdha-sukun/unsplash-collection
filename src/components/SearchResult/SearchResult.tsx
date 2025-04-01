"use client";
import { useSearchUnsplash } from "@/hooks/queries/useSearchUnsplash";
import { redirect, useSearchParams } from "next/navigation";
import {
	ImageGridContainer,
	ImageWrapper,
	StyledSearchResultContainer,
} from "./SearchResult.styled";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import Image from "next/image";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import Pagination from "../Pagination/Pagination";

const SearchResult = () => {
	const windowDimensions = useWindowDimensions();
	let numberOfColumns = 4;
	if ((windowDimensions.width ?? 0) <= 480) {
		numberOfColumns = 1;
	} else if ((windowDimensions.width ?? 0) <= 768) {
		numberOfColumns = 2;
	}
	const searchParams = useSearchParams();
	const query = searchParams.get("query");
	const [search, setSearch] = useState<string>(query ?? "");
	const [hasMore, setHasMore] = useState(true);
	const [result, setResult] = useState<
		{
			id: string;
			urls: { regular: string };
			alt_description: string;
			width: number;
			height: number;
		}[]
	>([]);
	const [page, setPage] = useState<number>(result.length / 10 + 1);
	const { data, isLoading } = useSearchUnsplash({ query: query ?? "", page });

	useEffect(() => {
		if (data) {
			setResult(data.data.results ?? []);
			setHasMore(page < data.data.total_pages);
		}
	}, [data, page]);

	useEffect(() => {
		setResult([]);
		setPage(1);
		setHasMore(true);
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			redirect(`/search?query=${search}`);
		}
	};

	const handleClick = (id: string) => {
		redirect(`/photos/${id}`);
	};

	const handlePrev = () => {
		if (page > 1 && !isLoading) {
			setPage((prev) => prev - 1);
		}
	};

	const handleNext = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	const goToPage = (page: number) => {
		if(!isLoading) {
			setPage(page);
		}
	};

	return (
		<StyledSearchResultContainer>
			<SearchBar
				value={search}
				placeholder="Enter your keywords..."
				handleChange={handleChange}
				handleKeyDown={handleKeyDown}
				width="40%"
			/>
			<ImageGridContainer $columns={numberOfColumns}>
				{result?.map((image) => (
					<ImageWrapper
						key={image.id}
						$ratio={image.width / image.height}
						onClick={() => handleClick(image.id)}
					>
						<Image
							src={image.urls.regular}
							alt={image.alt_description || ""}
							fill
							style={{ objectFit: "cover" }}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							quality={80}
						/>
					</ImageWrapper>
				))}
			</ImageGridContainer>
			<Pagination
				prevPage={handlePrev}
				currentPage={page}
				nextPage={handleNext}
				totalPages={data?.data.total_pages ?? 1}
				goToPage={goToPage}
			/>
		</StyledSearchResultContainer>
	);
};

export default SearchResult;
