import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

  const createFeedbackSpy = jest.fn()
  const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)
describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,0a8sd0asd9as8d09'
    })).resolves.not.toThrow();
      expect(createFeedbackSpy).toHaveBeenCalled();
      expect(sendMailSpy).toHaveBeenCalled();
  })
  it('should not be able to submit a feedback without a type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,0a8sd0asd9as8d09'
    })).rejects.toThrow();
  })
  it('should not be able to submit a feedback without a comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,0a8sd0asd9as8d09'
    })).rejects.toThrow();
  })
  it('should not be able to submit a feedback with an invalid format', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Tá tudo bugado',
      screenshot: 'test.jpg'
    })).rejects.toThrow();
  })
})
