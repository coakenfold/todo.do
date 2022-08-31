import styled from "styled-components";

// ======================================
// Create list
// ----------------------------------
export const TodoListsNewListGroup = styled.form`
  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 20%);
  border-radius: 1rem;
  display: flex;
  padding: 1rem;
  margin-bottom: 3rem;
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
`;

// ======================================
// Display lists
// ----------------------------------
export const TodoListsListCollectionGroup = styled.div`
  margin-bottom: 3rem;
`;
export const TodoListsListCollection = styled.ul`
  margin: 0;
  padding: 0;
`;
export const TodoListsListCollectionTitle = styled.h2`
  font-size: 0.9rem;
  font-weight: 100;
  margin: 0 0 0.3rem;
`;
export const TodoListsListCollectionEmpty = styled.h3`
  margin: 0;
  padding: 1rem;
  font-weight: 100;
`;

// ======================================
// List
// ----------------------------------
export const TodoListsList = styled.li`
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
  &:focus {
  }
`;
export const TodoListsListActionsGroup = styled.div`
  padding: 0.6rem 0 0.6rem 0.6rem;
  display: flex;
`;
export const TodoListsListBulkEditSelect = styled.input``;
export const TodoListsListDetailsButton = styled.button`
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
  }
`;
export const TodoListsListDeleteButton = styled.button`
  background-color: #fff;
  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 10%);
  border-radius: 0.6rem;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 1rem;
  margin-left: 0.6rem;

  &:focus,
  &:hover {
    background-color: hsl(190deg 100% 50% / 20%);
  }
`;
