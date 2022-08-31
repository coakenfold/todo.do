import styled from "styled-components";

export const TodoRoot = styled.div`
  font-family: sans-serif;
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
  margin: 0 auto;
  box-shadow: 0px 10px 40px 0px rgb(76 70 124 / 50%);
  min-width: 33rem;
  max-width: 66rem;
`;

export const TodoTitle = styled.h1`
  font-weight: 100;
  margin: 1rem 0 1rem;
`;

// ======================================
// ListCreate
// ----------------------------------
export const ListCreateContainer = styled.form`
  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 20%);
  border-radius: 1rem;
  display: flex;
  padding: 1rem;
  margin-bottom: 3rem;
`;
export const ListCreateInput = styled.input`
  background: transparent;
  border: none;
  flex: 1;
  font-size: 1.2rem;
  line-height: 3rem;
  margin-right: 0.3rem;
  padding: 0;
`;
export const ListCreateButton = styled.button`
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
// Lists
// ----------------------------------
export const ListsContainer = styled.div`
  margin-bottom: 3rem;
`;
export const ListsTitle = styled.h2`
  font-weight: 100;
  font-size: 1rem;
  margin: 0;
`;
export const Lists = styled.ul`
  margin: 0;
  padding: 0;
`;
export const ListsNoLists = styled.h3`
  margin: 0;
  padding: 1rem;
  font-weight: 100;
`;

// ======================================
// List
// ----------------------------------
export const List = styled.li`
  border-radius: 0.75rem;
  transition: background-color 190ms;
  display: flex;
  list-style-type: none;
  padding: 0 0.6rem;
  &:hover {
    background-color: rgb(91 155 200 / 6%);
  }
`;
export const ListBulkSelect = styled.input``;
export const ListName = styled.input`
  background-color: transparent;
  border: none;
  flex: 1;
  font-size: 1.3rem;
  font-weight: 100;
  padding: 1rem;
  &:focus {
  }
`;
export const ListActions = styled.div`
  padding: 0.6rem 0 0.6rem 0.6rem;
  display: flex;
`;

export const ListDetails = styled.button`
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
export const ListDelete = styled.button`
  background-color: #fff;
  box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 10%);
  border-radius: 0.6rem;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 1rem;
  margin-left: 0.6rem;

  &:focus {
    box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 10%);
  }
  &:hover {
    box-shadow: 0px 10px 40px 0px rgb(133 168 194 / 10%);
  }
`;
