import Joi from "joi";
const register = {
  body: Joi.object().keys({
    username: Joi.string().min(6).required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/)
      .messages({
        "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
      }).required(),
    role_id: Joi.number().required(),
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
  const { error, value } = subAdminSchema.validate(data)
  return { error, value }
}

const userUpdation = (data: any) => {
  const userSchema = Joi.object({
    username: Joi.string().min(6),
    email: Joi.string().email(),
    password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/),
    role_id: Joi.number(),
    permission: Joi.object(),
  })
  const { error, value } = userSchema.validate(data)
  return { error, value }
}

const UpdationPermissionSchema = (data: any) => {
  const userSchema = Joi.object({
    user_id: Joi.string().required,
    role_create: Joi.number(),
    role_update: Joi.number(),
    role_delete: Joi.number(),
    role_read: Joi.number(),
  })
  const { error, value } = userSchema.validate(data)
  return { error, value }
}


export default {
  register, login, userCreation, userUpdation, UpdationPermissionSchema
}