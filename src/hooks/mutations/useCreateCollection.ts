"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCollection = () => {
	const createCollection = async (name: string) => {
		const res = await fetch("/api/collections", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name }),
		});
		return res.json();
	};

    const queryClient = useQueryClient();
	const {
		isPending: isLoading,
		isError,
		isSuccess,
		mutateAsync: addNewCollection,
		reset,
	} = useMutation({
		mutationFn: createCollection,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["collectionsList"] });
		},
	});

	return { addNewCollection, isLoading, isError, isSuccess, reset };
};
