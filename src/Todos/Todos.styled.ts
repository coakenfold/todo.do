import styled from "styled-components";

export const TodoGroup = styled.div`
  font-family: sans-serif;
  background-color: #fff;
  padding: 1rem;
  margin: 0 auto;

  max-width: 66rem;
  min-width: 35rem;

  @media (min-width: 600px) {
    border-radius: 1rem;
    box-shadow: 0px 10px 40px 0px rgb(76 70 124 / 50%);
  }
`;

export const TodoTitle = styled.h1`
  font-weight: 100;
  margin: 1rem 0 1rem;
`;
