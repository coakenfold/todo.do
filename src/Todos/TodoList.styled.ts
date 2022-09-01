import styled from "styled-components";

export const TodoListGroup = styled.div`
  padding-left: 0;
`;
// ======================================
// Header
// ----------------------------------

export const TodoListHeaderHeadingTitleGroup = styled.div`
  flex: 1;
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
  margin-bottom: 1.3rem;
`;

export const TodoListMultiselectSelectAllButton = styled.button`
  transition: color 190ms, background-color 240ms;

  color: hsl(48deg 84% 17%);
  background-color: #fff;
  border: 2px solid hsl(47deg 100% 73% / 33%);

  border-radius: 0.6rem;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.6rem;

  &:focus,
  &:hover {
    background-color: hsl(48deg 100% 81%);
    color: hsl(48deg 70% 21%);
    border-color: hsl(47deg 100% 73%);
  }
`;
export const TodoListMultiselectDeleteButton = styled.button`
  transition: color 190ms, background-color 240ms;
  background-color: hsl(0deg 100% 50% / 14%);
  color: hsl(0deg 82% 19%);

  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 10%);
  border-radius: 0.6rem;

  border: 2px solid hsl(0deg 100% 50% / 5%);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.6rem;
  margin-left: 0.3rem;
  flex: 1;
  &:focus,
  &:hover {
    background-color: hsl(0deg 100% 50% / 24%);
    color: hsl(0deg 82% 19%);
  }
`;
export const TodoListMultiselectMarkCompleteButton = styled.button`
  transition: color 190ms, background-color 240ms;
  background-color: hsl(190deg 100% 50% / 17%);
  color: hsl(0deg 82% 19%);

  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 10%);
  border-radius: 0.6rem;
  border: 2px solid hsl(190deg 100% 50% / 5%);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.6rem;
  margin-left: 0.3rem;
  flex: 1;
  &:focus,
  &:hover {
    background-color: hsl(190deg 100% 50% / 20%);
  }
  &.active {
    background-color: hsl(190deg 100% 50% / 10%);
  }
`;
export const TodoListMultiselectActionGroup = styled.div`
  padding: 0;
  margin: 0 1.3rem 0.6rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${TodoListMultiselectSelectAllButton},
  ${TodoListMultiselectMarkCompleteButton} {
    margin-right: 0.3rem;
  }
`;
// ======================================
// Create todo
// ----------------------------------
export const TodoListNewTodoGroup = styled.form`
  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 20%);
  border-radius: 1rem;
  display: flex;
  padding: 1rem;
  margin-bottom: 0.9rem;
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
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background-color: hsl(190deg 32% 84% / 20%);
    }
  }
`;

// ======================================
// Display todos
// ----------------------------------
export const TodoListTodosList = styled.ul`
  margin: 0 1.3rem;
  padding: 0;
`;
