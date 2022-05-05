
import express from 'express';
import nodemailer from 'nodemailer';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { prisma } from './prisma';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';


export const routes = express.Router()


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6fbeaa80e51708",
      pass: "244c2f47b02ccb"
    }
});


routes.post('/feedbacks', async (req, res) =>{

    const {type, comment, screenshot} = req.body;

    const prismaFeedbackRepository = new PrismaFeedbackRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbackRepository,
        nodemailerMailAdapter
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    });
    return res.status(201).send();
})