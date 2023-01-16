import { app } from "./app";
import { AppDataSource } from "./data-source";
import "dotenv/config";

const PORT = 3000 || process.env.PORT;

AppDataSource.initialize().catch((err) =>
  console.error("Error during Data Source initialization", err)
);

app.listen(3000, () => console.log(`Server running on port ${PORT}`));
