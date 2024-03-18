import dotenv from 'dotenv';
dotenv.config();

import "reflect-metadata";
import { DataSource } from "typeorm";
import Express from 'express';

const app = Express();
const port = 3000;
app.use(Express.json());

app.get('/', (req, res) => {
    res.send('Hello form express!')
})

const appDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.DATABASE_USERPORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_USERPWD,
    database: 'typeorm_db',
    entities:["src/entity/*{.ts,.js}"],
    synchronize:true,
    logging:true,
    schema:'my_schema'
})
appDataSource.initialize().then(() => {
    console.log(`Database connect sucessfully!`)
}).catch((e) => {
    console.log(e);
})

app.listen(port, () => { console.log(`server is running on ${port}`) })

