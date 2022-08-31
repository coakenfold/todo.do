import styled from "styled-components";

export const TodoListContainer = styled.ul`
  padding-left: 0;
`;

export const TodoListTitleContainer = styled.div`
  margin: 2rem 0 1rem;
`;

export const TodoListTitleHeading = styled.h3`
  margin: 0 0 0.3rem;
  font-weight: 100;
  font-size: 0.9rem;
`;

export const TodoListTitleText = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 100;
`;

export const TodoListTodosContainer = styled.ul`
  margin: 0 1.3rem;
  padding: 0;
`;

export const TodoListItemCreateContainer = styled.form`
  box-shadow: 0px 10px 40px 0px rgb(188 131 49 / 20%);
  border-radius: 1rem;
  display: flex;
  padding: 1rem;
  margin-bottom: 1rem;
`;
export const TodoListItemCreateInput = styled.input`
  background: transparent;
  border: none;
  flex: 1;
  font-size: 1.2rem;
  line-height: 3rem;
  margin-right: 0.3rem;
  padding: 0;
`;
export const TodoListItemCreateButton = styled.button`
  transition: background-color 190ms;
  color: black;
  cursor: pointer;
  background-color: hsl(46deg 81% 75% / 20%);
  &:hover {
    background-color: hsl(46deg 100% 50% / 20%);
  }
  border-radius: 0.6rem;
  border: none;
  font-size: 1.2rem;
  margin: -0.6rem -0.6rem -0.6rem 0;
  padding: 1rem;
`;
