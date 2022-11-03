import * as dotenv from "dotenv"

dotenv.config()
console.log(process.env.PORT)

const { PORT, JWT_SECRET_KEY, JWT_EXPIRE } = process.env

export const api = {
    port: PORT || 3001,
    jwtSecretKey: JWT_SECRET_KEY,
    jwtExpire: JWT_EXPIRE
}