import styled from "styled-components";

export const TodoListGroup = styled.ul`
  padding-left: 0;
`;
// ======================================
// Header
// ----------------------------------
export const TodoListHeaderGroup = styled.div`
  margin: 2rem 0 1rem;
`;

export const TodoListHeaderHeading = styled.h3`
  font-size: 0.9rem;
  font-weight: 100;
  margin: 0 0 0.3rem;
`;

export const TodoListHeaderTitle = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 100;
`;

// ======================================
// Create todo
// ----------------------------------
export const TodoListNewTodoGroup = styled.form`
  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 20%);
  border-radius: 1rem;
  display: flex;
  padding: 1rem;
  margin-bottom: 1rem;
`;
export const TodoListNewTodoInput = styled.input`
  background: transparent;
  border: none;
  flex: 1;
  font-size: 1.2rem;
  line-height: 3rem;
  margin-right: 0.3rem;
  padding: 0;
`;
export const TodoListNewTodoButton = styled.button`
  color: black;
  transition: background-color 190ms;
  background-color: hsl(190deg 32% 84% / 20%);
  &:hover {
    background-color: hsl(190deg 100% 50% / 20%);
  }
  cursor: pointer;
  border-radius: 0.6rem;
  border: none;
  font-size: 1.2rem;
  margin: -0.6rem -0.6rem -0.6rem 0;
  padding: 1rem;
`;

// ======================================
// Display todos
// ----------------------------------
export const TodoListTodosList = styled.ul`
  margin: 0 1.3rem;
  padding: 0;
`;
