"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemovePhotoFromCollection = (photoId: string) => {
	const removePhotoFromCollection = async ({
		collectionId,
		photoId,
	}: { collectionId: string; photoId: string }) => {
		await fetch(
			`/api/collections/${collectionId}/photos/${photoId}`,
			{
				method: "DELETE",
			},
		);
	};
	const queryClient = useQueryClient();
	const {
		isPending: isLoading,
		isError,
		isSuccess,
		mutateAsync: deleteFromCollection,
		reset,
	} = useMutation({
		mutationFn: removePhotoFromCollection,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["unsplashImageDetails", photoId],
			});
			queryClient.invalidateQueries({
				queryKey: ["collectionsList"],
			});
		},
	});

	return { deleteFromCollection, isLoading, isError, isSuccess, reset };
};
