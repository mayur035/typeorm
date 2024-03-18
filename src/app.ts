import dotenv from 'dotenv';
dotenv.config();

import "reflect-metadata";
import { DataSource } from "typeorm";
import Express from 'express';
import { User } from './entity/user';

const app = Express();
const port = 3000;
app.use(Express.json());

app.get('/', async (req, res) => {
    const userRepo = appDataSource.getRepository(User);

    //find
    const allRecords = await userRepo.find();
    res.json(allRecords)

    //find conditionally
    // const record =await userRepo.findOne({where:{firstname:'mayur'}})
    // res.json(record)

    //add
    // const user:User = new User();
    // user.firstname = 'Ann Payne'
    // user.lastname = 'Addie Chapman'
    // user.email = 'me@bo.sr'
    
    // const userInserted =await userRepo.save(user);
    // res.json(userInserted)

    //delete
    // await userRepo.delete(3)
    // res.send('Delete sucessfully')

    //update
    // await userRepo.update(4,{firstname:'mayur',lastname:'patel',email:'abc@gmail.com'})
    // res.send('Update sucessfully!')
})

const appDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.DATABASE_USERPORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_USERPWD,
    database: 'typeorm_db',
    entities: ["src/entity/*{.ts,.js}"],
    synchronize: true,
    logging: true,
    schema: 'my_schema'
})
appDataSource.initialize().then(() => {
    console.log(`Database connect sucessfully!`)
}).catch((e) => {
    console.log(e);
})

app.listen(port, () => { console.log(`server is running on ${port}`) })

