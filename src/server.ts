import {app} from "./app";
import { AppDataSource } from "./data-source";
import "dotenv/config";

AppDataSource.initialize()
.then(() => {
    console.log("Database running");
    const PORT = process.env.PORT;

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error("Error during Data Source initialization", err));