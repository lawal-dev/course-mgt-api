import { config } from "dotenv";
import app from "./app.js";

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log("Server listen on PORT 5000");
});
