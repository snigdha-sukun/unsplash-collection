"use client";

import { useQuery } from "@tanstack/react-query";

export const useSearchUnsplash = ({ query, page }: { query: string, page: number }) => {
	const searchUnsplash = async (query: string) => {
		const res = await fetch(`/api/search?query=${query}&page=${page}`);
		return res.json();
	};
	const { data, isLoading, error } = useQuery({
		queryKey: ["unsplashSearchImages", query, page],
		queryFn: () => searchUnsplash(query),
		enabled: !!query,
	});

    return { data, isLoading, error };
};
