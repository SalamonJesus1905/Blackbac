import Joi from "joi";
const register = {
    body: Joi.object().keys({
        username : Joi.string().min(6).required(),
        email : Joi.string().required(),
        password : Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/)
        .messages({
            "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
            "string.empty": `Password cannot be empty`,
            "any.required": `Password is required`,
          }).required(),
        role_id : Joi.number().required(),
    }),
  };

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/).required()
  })
}

const userCreation = (data: any) => {
  const subAdminSchema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    role_id: Joi.number().required(),
    permission: Joi.object(),
  })
  const {error, value} = subAdminSchema.validate(data)
  return {error, value}
}


  export default {
    register, login, userCreation
  }