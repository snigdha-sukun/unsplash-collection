"use client";
import { tablet } from "@/utils/mixins";
import styled from "styled-components";

export const StyledSearchResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 4rem;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease-in-out;
    min-height: 80vh;
    width: 100%;
    background-image: url("/gradient-bg.svg");
    background-size: 100%;
    background-repeat: no-repeat;

    ${tablet`
        padding: 2rem;`
    }
`;

export const ImageGridContainer = styled.div<{ $columns: number }>`
  column-count: ${({ $columns }) => $columns};
  column-gap: 2rem;
  width: 100%;
  height: 100%;
`;

export const ImageWrapper = styled.div<{ $ratio: number }>`
  position: relative;
  display: inline-block;
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;
