"use client";

import { useQuery } from "@tanstack/react-query";

export const useFetchImageDetails = ({ id }: { id: string }) => {
	const fetchImageDetails = async (id: string) => {
		const res = await fetch(`/api/photos/${id}`);
		return res.json();
	};
	const { data, isLoading, error } = useQuery({
		queryKey: ["unsplashImageDetails", id],
		queryFn: () => fetchImageDetails(id),
		enabled: !!id,
	});

	return { data, isLoading, error };
};
