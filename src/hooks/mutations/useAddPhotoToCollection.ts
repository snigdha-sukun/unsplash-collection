"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddPhotoToCollection = (photoId: string) => {
	const addPhotoToCollection = async ({
		collectionId,
		photoId,
	}: { collectionId: string; photoId: string }) => {
		await fetch(`/api/collections/${collectionId}/photos`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ photoId }),
		});
	};

	const queryClient = useQueryClient();

	const {
		isPending: isLoading,
		isError,
		isSuccess,
		mutateAsync: addToCollection,
		reset,
	} = useMutation({
		mutationFn: addPhotoToCollection,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["unsplashImageDetails", photoId],
			});
			queryClient.invalidateQueries({
				queryKey: ["collectionsList"],
			});
		},
	});

	return { addToCollection, isLoading, isError, isSuccess, reset };
};
