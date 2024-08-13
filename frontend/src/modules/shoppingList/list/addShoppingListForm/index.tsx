import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ShoppingList } from "../../../../global/api";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

function transformObject(obj: Record<string, string>) {
  let result: Omit<ShoppingList, "id"> = {
    name: obj.name,
    items: [],
  };

  for (let key in obj) {
    if (key.startsWith("new item-")) {
      result.items.push(obj[key]);
    }
  }

  return result;
}

function AddShoppingListForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [items, setItems] = React.useState<string[]>([]);

  const onSubmit = React.useCallback((data: any) => {
    const valuesToSend = transformObject(data);

    console.log("valuesToSend", valuesToSend);
  }, []);

  const addItem = React.useCallback(() => {
    setItems((prev) => [...prev, "new item"]);
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input id="name" {...register("name", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}

      <span>tasks</span>
      {items.map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          <label htmlFor={`${item}-${index}`}>Item {index + 1}</label>
          <input
            defaultValue={item}
            id={`${item}-${index}`}
            {...register(`${item}-${index}`, { required: true })}
          />
        </React.Fragment>
      ))}

      <button type="button" onClick={addItem}>
        Add item
      </button>

      <input type="submit" />
    </Form>
  );
}

export { AddShoppingListForm };
