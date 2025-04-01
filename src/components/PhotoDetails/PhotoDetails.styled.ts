"use client";
import styled from "styled-components";

export const StyledPhotoDetailsContainer = styled.div`
    display: flex;
    gap: 2rem;
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease-in-out;
`;

export const StyledImageContainer = styled.div`
    width: 50%;
    border-radius: 0.5rem;
    overflow: hidden;
`;

export const StyledImageDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50%;
`;

export const StyledAuthor = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const StyledAuthorImage = styled.div`
    border-radius: 50%;
    overflow: hidden;
`;

export const StyledAuthorName = styled.a`
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    cursor: pointer;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};

    &:hover {
        text-decoration: underline;
    }
`;

export const StyledPublishedDate = styled.p`
    font-size: 0.875rem;
`;

export const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
`;

export const StyledButton = styled.button<{ $isActive?: boolean }>`
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    border: none;
    background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.text : theme.colors.selectedNavItem)};
    color: ${({ theme, $isActive }) => ($isActive ? theme.colors.selectedNavItem : theme.colors.text)};
    font-weight: ${({ theme }) => theme.fontWeights.bolder};
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &:hover {
        background-color: ${({ theme }) => theme.colors.searchBarBorder};
    }
    &:disabled {
        cursor: not-allowed;
    }
`;
