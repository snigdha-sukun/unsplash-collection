"use client";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { StyledButton } from "../PhotoDetails/PhotoDetails.styled";
import { StyledPaginationContainer } from "./Pagination.styled";
import { getPageRange } from "./Pagination.utils";

const Pagination = ({
	prevPage,
	currentPage,
	nextPage,
	totalPages,
	goToPage,
}: {
	prevPage: () => void;
	currentPage: number;
	nextPage: () => void;
	totalPages: number;
	goToPage: (page: number) => void;
}) => {
	const { isDarkMode } = useTheme();
	const { start, end } = getPageRange(currentPage, totalPages);
	return (
		<StyledPaginationContainer>
			<StyledButton onClick={prevPage} disabled={currentPage === 1}>
				{isDarkMode ? (
					<Image
						src="/left-chevron dark.svg"
						alt="Previous"
						width={16}
						height={16}
					/>
				) : (
					<Image
						src="/left-chevron.svg"
						alt="Previous"
						width={16}
						height={16}
					/>
				)}
			</StyledButton>

			{Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
				(page) => (
					<StyledButton
						key={page}
						onClick={() => goToPage(page)}
						$isActive={page === currentPage}
					>
						{page.toString()}
					</StyledButton>
				),
			)}
			<StyledButton onClick={nextPage} disabled={currentPage === totalPages}>
				{isDarkMode ? (
					<Image
						src="/right-chevron dark.svg"
						alt="Previous"
						width={16}
						height={16}
					/>
				) : (
					<Image
						src="/right-chevron.svg"
						alt="Previous"
						width={16}
						height={16}
					/>
				)}
			</StyledButton>
		</StyledPaginationContainer>
	);
};
export default Pagination;
