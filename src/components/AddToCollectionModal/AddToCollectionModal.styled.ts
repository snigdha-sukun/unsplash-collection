"use client";
import styled from "styled-components";

export const CollectionList = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const CollectionItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.selectedNavItem};
  }

  &:hover button {
    display: flex;
  }
`;

export const CollectionDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ModalHeading = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    `;

export const StyledCollectionThumbnail = styled.div`
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;
    width: 4rem;
    height: 4rem;
    background-color: ${({ theme }) => theme.colors.searchBarBorder};
`;

export const StyledButtonHover = styled.button`
  all: unset;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  border: none;
  display: none;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.bolder};
  gap: 0.5rem;
`