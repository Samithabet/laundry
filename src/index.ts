import App from "./app";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT 
App.app.listen(PORT, () => console.log(`Server is running on port${PORT}` ));
