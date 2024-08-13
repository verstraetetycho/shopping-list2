import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { z } from "zod";
import { validateData } from "./middleware/validation";
import { StatusCodes } from "http-status-codes";
import { randomUUID } from "node:crypto";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

type ShoppingList = {
  id: string;
  name: string;
  items: string[];
};

const shoppingLists: ShoppingList[] = [];

const createShoppingListSchema = z.object({
  name: z.string(),
  items: z.array(z.string()),
});

app.use(cors());

app
  .route("/shopping-lists")
  .get((req, res) => {
    res.status(StatusCodes.OK).json(shoppingLists);
  })
  .post(validateData(createShoppingListSchema), (req, res) => {
    const shoppingList = req.body;

    const id = randomUUID();

    shoppingLists.push({ id, ...shoppingList });

    res.status(StatusCodes.CREATED).json(shoppingList);
  });

app.delete("shopping-lists/:id", (req, res) => {
  //
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
