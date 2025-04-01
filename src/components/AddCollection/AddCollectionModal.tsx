"use client";
import { useState } from "react";
import Modal from "../Modal/Modal";
import {
	ModalContainer,
	ModalHeading,
	StyledButton,
	StyledButtonContainer,
	StyledInput,
} from "./AddCollectionModal.styled";
import { useCreateCollection } from "@/hooks/mutations/useCreateCollection";

interface AddCollectionModalProps {
	readonly isOpen: boolean;
	readonly onClose: () => void;
}

const AddCollectionModal = ({ isOpen, onClose }: AddCollectionModalProps) => {
	const [name, setName] = useState("");
	const { addNewCollection } = useCreateCollection();

	const handleSave = async () => {
		if (name.trim()) {
			await addNewCollection(name);
			setName("");
			onClose();
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalContainer>
				<ModalHeading>Add Collection</ModalHeading>
				<StyledInput
					value={name}
					placeholder="Add new collection..."
					onChange={(e) => setName(e.target.value)}
				/>
				<StyledButtonContainer>
					<StyledButton onClick={handleSave}>Save</StyledButton>
					<StyledButton $isSecondary onClick={onClose}>
						Cancel
					</StyledButton>
				</StyledButtonContainer>
			</ModalContainer>
		</Modal>
	);
};

export default AddCollectionModal;
