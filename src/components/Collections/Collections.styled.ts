"use client";
import styled from "styled-components";

export const StyledCollectionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease-in-out;
    min-height: 80vh;
    width: 100%;
`;

export const StyledCollections = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 1rem;
    width: 100%;
`;

export const StyledHeading = styled.h1`
  font-size: 2.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.bolder};
  background: linear-gradient(to right, #F2C593, #8A3282);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
`;

export const StyledSubtitle = styled.p`
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.fontWeights.base};
    text-align: center;
    max-width: 35%;
`;

export const StyledAnchor = styled.a`
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const StyledCollection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`;

export const StyledCollectionImage = styled.div`
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;
    width: 20rem;
    height: 15rem;
    background-color: ${({ theme }) => theme.colors.selectedNavItem};
`;

export const StyledCollectionName = styled.h2`
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const StyledCollectionDescription = styled.p`
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.fontWeights.base};
`;

export const StyledCollectionAddNew = styled.button`
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.selectedNavItem};
    color: ${({ theme }) => theme.colors.navbarText};
    font-weight: ${({ theme }) => theme.fontWeights.bolder};
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 20rem;
    height: 18rem;
    justify-content: center;
    text-align: center;
    &:focus {
        outline: none;
    }
    &:hover {
        background-color: ${({ theme }) => theme.colors.searchBarBorder};
    }
`;