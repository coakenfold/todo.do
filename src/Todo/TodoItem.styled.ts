import styled from "styled-components";
export const TodoItemName = styled.input`
  background-color: transparent;
  border: none;
  flex: 1;
  font-size: 1.3rem;
  font-weight: 100;
  padding: 1rem;
  &:focus {
  }
`;
export const TodoItemContainer = styled.li`
  border-radius: 0.75rem;
  display: flex;
  list-style-type: none;
  padding: 0 0.6rem;
  background-color: rgb(252 176 69 / 0);
  transition: background-color 190ms;
  &:hover {
    background-color: rgb(252 176 69 / 30%);
  }

  &.done {
    ${TodoItemName} {
      text-decoration: line-through;
      cursor: not-allowed;
    }
  }

  &.highlight {
    background-color: rgb(252 176 69 / 50%);
  }
`;
export const TodoItemActions = styled.div`
  padding: 0.6rem 0 0.6rem 0.6rem;
  display: flex;
`;
export const TodoItemDelete = styled.button`
  background-color: #fff;
  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 10%);
  border-radius: 0.6rem;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 1rem;
  flex: 1;
  &:focus {
  }
  &:hover {
  }
`;
