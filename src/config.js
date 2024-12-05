import {config}from 'dotenv'
config()

export const BD_HOST=process.env.BD_HOST || 'bpdpehst2rhlt8djogna-mysql.services.clever-cloud.com'
export const BD_DATABASE=process.env.BD_DATABASE||'bpdpehst2rhlt8djogna'
export const DB_USER=process.env.DB_USER|| 'u9roum4mi6xonpsx'
export const DB_PASSWORD=process.env.DB_PASSWORD||'lpGa1kkmnsSUsuQw73YV'
export const DB_PORT=process.env.DB_PORT|| 3306
export const PORT= process.env.PORT|| 3000