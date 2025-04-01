"use client";
import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.selectedNavItem};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease-in-out;
`;

export const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const StyledNavItem = styled.li<{ $isSelected?: boolean }>`
    background-color: ${({ theme, $isSelected }) => $isSelected ? theme.colors.selectedNavItem : "transparent"};
    list-style: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.navbarText};
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: ${({ theme }) => theme.colors.selectedNavItem};
    }
`;