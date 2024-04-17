import { connectDB } from "./connectDB"
import { app } from "./app"

const port = process.env.PORT || "3000"

connectDB()
    .then(() => app.listen(port, () => console.log(`App is running on http://localhost:${port}`)))
    .catch((err) => console.log("MONGODB connection failed !!! ", err))





