import urlSchema from '../schemas/urlSchema.js';

async function urlValidation(req, res, next) {
  const validation = urlSchema.validate(req.body);

  if (validation.error) {
    return res.status(422).send(validation.error.details);
  }

  next();
}

export default urlValidation;