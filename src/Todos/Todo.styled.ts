import styled from "styled-components";
export const TodoName = styled.input`
  background-color: transparent;
  border: none;
  flex: 1;
  font-size: 1.3rem;
  font-weight: 100;
  padding: 1rem;
  &:focus {
  }
`;
export const TodoGroup = styled.li`
  border-radius: 0.75rem;
  display: flex;
  list-style-type: none;
  padding: 0 0.6rem;
  transition: background-color 190ms;
  &:hover {
    background-color: rgb(91 155 200 / 6%);
  }

  &.done {
    ${TodoName} {
      text-decoration: line-through;
      cursor: not-allowed;
    }
  }

  &.highlight {
    background-color: rgb(124 201 255 / 50%);
  }
`;
export const TodoMultiSelectButton = styled.button`
  transition: color 190ms, background-color 240ms;
  background-color: #fff;

  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 10%);
  border-radius: 0.6rem;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 1rem;
  flex: 1;

  &:focus,
  &:hover {
    background-color: hsl(190deg 100% 50% / 20%);
    color: hsl(190deg 82% 19%);
  }
`;
export const TodoDeleteButton = styled.button`
  transition: color 190ms, background-color 240ms;
  background-color: #fff;

  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 10%);
  border-radius: 0.6rem;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 1rem;
  flex: 1;
  &:focus,
  &:hover {
    background-color: hsl(0deg 100% 50% / 24%);
    color: hsl(0deg 82% 19%);
  }
`;

export const TodoActionsGroup = styled.div`
  padding: 0.6rem 0 0.6rem 0.6rem;
  display: flex;
  ${TodoDeleteButton} {
    margin-left: 0.9rem;
  }
`;
