import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getShoppingLists } from "./getShoppingLists";
import styled from "styled-components";
import Modal from "react-modal";
import { AddShoppingListForm } from "./addShoppingListForm";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: unset;
  padding-inline: unset;
  padding: 16px 24px;
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #222;
  }
`;

function ShoppingList() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["shoppingList"],
    queryFn: getShoppingLists,
  });

  const toggleModal = React.useCallback(() => {
    setModalIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Wrapper>
        <h1>Your shopping lists</h1>
        <Button onClick={toggleModal}>Create shopping list</Button>
      </Wrapper>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error !== null && <p>{error.message}</p>}
          {data !== undefined && data.length > 0 ? (
            data.map((list) => <div key={list.id}>{list.name}</div>)
          ) : (
            <p>
              There are no shopping lists yet. Create one via the button in the
              top right
            </p>
          )}
        </>
      )}
      <Modal isOpen={modalIsOpen} contentLabel="Create shopping list">
        <Wrapper>
          <h2>Create shopping list</h2>
          <button onClick={toggleModal}>close</button>
        </Wrapper>
        <AddShoppingListForm />
      </Modal>
    </>
  );
}

export { ShoppingList };
