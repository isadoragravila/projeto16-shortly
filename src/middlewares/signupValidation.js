import signupSchema from '../schemas/signupSchema.js';

async function signupValidation(req, res, next) {
  const validation = signupSchema.validate(req.body);

  if (validation.error) {
    return res.status(422).send(validation.error.details);
  }

  next();
}

export default signupValidation;