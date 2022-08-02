import signinSchema from '../schemas/signinSchema.js';

async function signinValidation(req, res, next) {
  const validation = signinSchema.validate(req.body);

  if (validation.error) {
    return res.status(422).send(validation.error.details);
  }

  next();
}

export default signinValidation;