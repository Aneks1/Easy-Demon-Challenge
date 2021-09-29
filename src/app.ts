import express from 'express'
import fs from 'fs'
import { port } from './config.json'
import path from 'path'

const app = express()

export default function start() {
    app.use(express.static(path.join(__dirname + '../../../public')))

    app.get('/', async (req, res) => {
        const html = await fs.readFileSync('public/index.html', 'utf8')
        return res.send(html)
    })
      
    app.listen(port, () => {
        console.log(`Easy Demon Challenge is now running locally at http://localhost:${port}`)
    })
}