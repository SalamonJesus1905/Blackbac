import Joi from 'joi';
import pick from '../utils/pick';
const validate = (schema:any) => (req:any, res:any, next:any) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);
    
    if (error) {
      next(error) 
    }
    Object.assign(req, value);
    return next();
  };

export default validate;