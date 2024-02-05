import "dotenv/config"

import { connectDB } from "./connectDB"
import { app } from "./app"

export interface processEnv {
    PORT: string,
    NODE_ENV: string,
    MONGODB_URI: string
}

const port: string = process.env.PORT as string

connectDB()
    .then(() => app.listen(port, () => console.log(`App is running on http://localhost:${port}`)))
    .catch((err) => console.log("MONGODB connection failed !!! ", err))





