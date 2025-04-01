"use client";
import { mobile } from "@/utils/mixins";
import styled from "styled-components";

export const StyledPaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;

    ${mobile`
        gap: 0.3rem;
    `}
`;