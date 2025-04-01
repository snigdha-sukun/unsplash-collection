"use client";
import styled from "styled-components";

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
`;

export const ModalHeading = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

export const StyledInput = styled.input`
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.searchBarBorder} !important;
    box-shadow: 0 0 0.5rem 0.02rem rgba(0, 0, 0, 0.1);
    padding: 1.2rem;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.colors.searchBarBg};
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.base};
    outline: none;
    &::placeholder {
        color: ${({ theme }) => theme.colors.navbarText};
    }
`;

export const StyledButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
`;

export const StyledButton = styled.button<{ $isSecondary?: boolean }>`
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    border: none;
    background-color: ${({ theme, $isSecondary }) => $isSecondary ? theme.colors.background : theme.colors.selectedNavItem};
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.bolder};
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &:hover {
        background-color: ${({ theme }) => theme.colors.searchBarBorder};
    }
`;