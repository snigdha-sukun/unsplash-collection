"use client";
import styled from "styled-components";

export const StyledHome = styled.main`
    width: 100vw;
    height: 90vh;
    background-image: url("/hero-image.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease-in-out;
`;

export const StyledTitle = styled.h1`
    font-size: 2.25rem;
    font-weight: ${({ theme }) => theme.fontWeights.bolder};
`;

export const StyledSubtitle = styled.p`
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.fontWeights.base};
`;