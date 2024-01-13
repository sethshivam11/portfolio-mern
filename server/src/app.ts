import path from "path"
import { Message } from "./message.model"
import express, { Express, Request, Response, Router } from "express"

export const app: Express = express()
const router = Router()

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))


// Routes
app.post("/api/create", async (req: Request, res: Response) => {
    const { name, email, message, phone } = req.body
    let success: Boolean = false
    try {
        const msg = await Message.create({email, message, name, phone})

        // Add node-mailer functionality
        success = true
        return res.status(200).json({ success, message: "Message saved successfully", msg })

    } catch (err) {

        console.log(err)
        res.status(500).json({ success, error: "Internal Server Error" })

    }
})

// Deployment
const __dirname1 = path.resolve()
if (process.env.NODE_ENV) {
    app.use(express.static(path.join(__dirname1, "client", "dist")));
    app.get("*", (_: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"))
    })
} else {
    router.get("/", (_: Request, res: Response) => {
        res.send(`App is running on ${process.env.PORT}`)
    })
}

