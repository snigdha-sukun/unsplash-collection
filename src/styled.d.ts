import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			text: string;
			background: string;
			navbarText: string;
			selectedNavItem: string;
			searchBarBg: string;
			searchBarBorder: string;
		};
		fontSizes: {
			base: string;
		};
		fontWeights: {
			base: number;
			bold: number;
			bolder: number;
		};
	}
}
