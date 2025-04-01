"use client";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { StyledHome, StyledSubtitle, StyledTitle } from "./Home.styled";
import { redirect } from "next/navigation";

const Home = () => {
	const [search, setSearch] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			redirect(`/search?query=${search}`);
		}
	};

	return (
		<StyledHome>
			<StyledTitle>Search</StyledTitle>
			<StyledSubtitle>
				Search high-resolution images from Unsplash
			</StyledSubtitle>
			<SearchBar
				value={search}
				placeholder="Enter your keywords..."
				handleChange={handleChange}
				handleKeyDown={handleKeyDown}
				width="40%"
			/>
		</StyledHome>
	);
};

export default Home;
