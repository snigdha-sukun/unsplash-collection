import { StyledSearchBar } from "./SearchBar.styled";

const SearchBar = ({
	value,
    placeholder,
	handleChange,
	handleKeyDown,
    width
}: {
	value: string;
    placeholder: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    width: string;
}) => {
	return (
		<StyledSearchBar
			type="search"
			value={value}
			placeholder={placeholder}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
            $width={width}
		/>
	);
};

export default SearchBar;
