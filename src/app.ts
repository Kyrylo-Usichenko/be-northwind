import Database from "better-sqlite3";
import cors from "cors";
import { drizzle } from "drizzle-orm/better-sqlite3";
import exress from "express";
import { customersSchema } from "./schemas/main/main";
const app = exress();
const port = 4321;

app.use(cors());

const sqlite = new Database("./src/main.db");
const db = drizzle(sqlite);

app.get("/", (req: any, res: any) => {
  const customers = db.select().from(customersSchema).all();
  res.send(customers);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
