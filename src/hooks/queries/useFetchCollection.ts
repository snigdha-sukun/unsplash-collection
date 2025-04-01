"use client";

import { useQuery } from "@tanstack/react-query";

export const useFetchCollection = ({ id }: { id: string }) => {
	const fetchCollection = async (id: string) => {
		const res = await fetch(`/api/collections/${id}`);
		return res.json();
	};
	const { data, isLoading, error } = useQuery({
		queryKey: ["collection", id],
		queryFn: () => fetchCollection(id),
		enabled: !!id,
	});

	return { data, isLoading, error };
};
