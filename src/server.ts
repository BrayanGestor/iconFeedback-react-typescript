import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import express from "express";
import cors from "cors";
import { routes } from "./routes";


const app = express();

//cors liberar acess front-end no back-end
app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3333,()=>{
    console.log('HTTP server running');
});