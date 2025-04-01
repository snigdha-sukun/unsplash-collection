"use client";

import { useQuery } from "@tanstack/react-query";

export const useFetchCollections = () => {
	const fetchCollections = async () => {
		const res = await fetch("/api/collections");
		return res.json();
	};
	const { data, isLoading, error } = useQuery({
		queryKey: ["collectionsList"],
		queryFn: () => fetchCollections(),
	});

	return { data, isLoading, error };
};
