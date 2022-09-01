import styled from "styled-components";

// ======================================
// Create list
// ----------------------------------
export const TodoListsNewListGroup = styled.form`
  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 20%);
  border-radius: 1rem;
  display: flex;
  padding: 1rem;
  margin-bottom: 0.3rem;
`;
export const TodoListsNewListInput = styled.input`
  background: transparent;
  border: none;
  flex: 1;
  font-size: 1.2rem;
  line-height: 3rem;
  margin-right: 0.3rem;
  padding: 0;
`;
export const TodoListsNewListButton = styled.button`
  transition: background-color 190ms;
  background-color: hsl(190deg 32% 84% / 20%);
  &:focus,
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
// Display lists
// ----------------------------------
export const TodoListsListGroup = styled.div`
  margin: 1.6rem 0 1.9rem;
`;
export const TodoListsListCollection = styled.ul`
  margin: 0;
  padding: 0;
`;

export const TodoListsHeaderGroup = styled.div`
  display: flex;
  margin: 0 0 0.3rem;
`;

export const TodoListsTitle = styled.h2`
  font-size: 0.9rem;
  font-weight: 100;
  margin: 0;
  padding: 0.6rem;

  flex: 1;
`;

export const TodoListsMultiselectSelectAllButton = styled.button`
  transition: color 190ms, background-color 240ms;

  color: hsl(48deg 84% 17%);
  background-color: hsl(48deg 100% 90%);
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

export const TodoListsMultiselectDeleteButton = styled.button`
  transition: color 190ms, background-color 240ms;
  background-color: hsl(0deg 100% 50% / 14%);
  color: hsl(0deg 82% 19%);

  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 10%);
  border-radius: 0.6rem;
  border: none;
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

export const TodoListsMultiselectActionGroup = styled.div`
  padding: 0;
  display: flex;
  justify-content: flex-end;
  ${TodoListsMultiselectSelectAllButton} {
    margin-left: 0.3rem;
  }
`;

// ======================================
// List
// ----------------------------------
export const TodoListsListItem = styled.li`
  border-radius: 0.75rem;
  display: flex;
  list-style-type: none;
  padding: 0 0.6rem;
  transition: background-color 190ms;
  &:hover {
    background-color: rgb(91 155 200 / 6%);
  }
`;
export const TodoListsListName = styled.input`
  background-color: transparent;
  border: none;
  flex: 1;
  font-size: 1.3rem;
  font-weight: 100;
  padding: 1rem;
  margin: 0 0.3rem;
  &:focus {
  }
`;

// List Actions
export const TodoListsListDetailsButton = styled.button`
  background-color: #fff;
  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 10%);
  border-radius: 0.6rem;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 1rem;
  &:focus,
  &:hover {
    background-color: hsl(190deg 100% 50% / 20%);
  }
  &.active {
    background-color: hsl(190deg 100% 50% / 10%);
  }
`;
export const TodoListsListMultiselectButton = styled.button`
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
    background-color: hsl(48deg 100% 81%);
    color: hsl(48deg 70% 21%);
  }
  &.selected {
    background-color: hsl(47deg 100% 73%);
    color: hsl(48deg 84% 17%);
  }
`;
export const TodoListsListDeleteButton = styled.button`
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

export const TodoListsListActionsGroup = styled.div`
  padding: 0.6rem 0;
  display: flex;
  ${TodoListsListDeleteButton} {
    margin-left: 0.9rem;
  }
`;
