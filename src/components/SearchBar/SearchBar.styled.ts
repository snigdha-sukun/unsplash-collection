"use client";
import { tablet } from "@/utils/mixins";
import styled from "styled-components";

export const StyledSearchBar = styled.input<{ $width: string }>`
    width: ${({ $width }) => $width};
    border-radius: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.searchBarBorder} !important;
    box-shadow: 0 0 0.5rem 0.02rem rgba(0, 0, 0, 0.1);
    padding: 1.2rem;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.colors.searchBarBg};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    background-image: url("/Search.svg");
    background-repeat: no-repeat;
    background-position: 95%;
    &::placeholder {
        color: ${({ theme }) => theme.colors.navbarText};
    }

    ${tablet`
        width: 100%;
    `}
`;
