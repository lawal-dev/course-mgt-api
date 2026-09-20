import { configs } from "../config/config.js";
import app from "./app.js";

const PORT = configs.port;

app.listen(PORT, () => {
  console.log(`Server listen on PORT ${PORT}`);
});
