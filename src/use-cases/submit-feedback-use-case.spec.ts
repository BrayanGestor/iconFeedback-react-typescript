import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";


const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit Feedback', () => {

    it('should be able to submit a feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,ascovboauscbaoiscblacsba',
        })).resolves.not.toThrow();
    })

    it('should not be able to submit without type', async () => {

        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,ascovboauscbaoiscblacsba',
        })).rejects.toThrow();
    })

    it('should not be able to submit without comment', async () =>{

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,jbiousbvsodivbosbv',
        })).rejects.toThrow();
    })

    it('should not be able to submit with invalid screenshot', async () =>{

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'test.jpg',
        })).rejects.toThrow();
    })

});