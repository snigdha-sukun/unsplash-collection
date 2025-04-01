"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

import { StyledHeader, StyledNav, StyledNavItem } from "./Header.styled";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
	const { isDarkMode, toggleTheme } = useTheme();
	const [selectedNavItem, setSelectedNavItem] = useState<string>("home");
	const router = useRouter();
	const path = usePathname()

	useEffect(() => {
		if (path === "/" || path === "/search") {
			setSelectedNavItem("home");
		} else if (path.includes("/collections")) {
			setSelectedNavItem("collections");
		} else {
			setSelectedNavItem("");
		}
	}, [path]);

	const handleClick = (val: string) => {
		if (val === "home") {
			router.push("/");
		} else {
			router.push("/collections");
		}
	};
	return (
		<StyledHeader>
			{isDarkMode ? (
				<Image
					src="/Logo_Dark.svg"
					alt="Unsplash Logo"
					width={100}
					height={50}
				/>
			) : (
				<Image src="/Logo.svg" alt="Unsplash Logo" width={100} height={50} />
			)}
			<StyledNav>
				<StyledNavItem
					$isSelected={selectedNavItem === "home"}
					onClick={() => handleClick("home")}
				>
					Home
				</StyledNavItem>
				<StyledNavItem
					$isSelected={selectedNavItem === "collections"}
					onClick={() => handleClick("collections")}
				>
					Collections
				</StyledNavItem>
				<StyledNavItem onClick={toggleTheme}>
					{isDarkMode ? (
						<Image
							src="/light-mode.svg"
							alt="Sun Icon"
							width={20}
							height={20}
						/>
					) : (
						<Image
							src="/dark-mode.svg"
							alt="Moon Icon"
							width={20}
							height={20}
						/>
					)}
				</StyledNavItem>
			</StyledNav>
		</StyledHeader>
	);
};

export default Header;
