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

const PermissionSchema = (data: any) => {
  const userSchema = Joi.object({
    role_create: Joi.number(),
    role_update: Joi.number(),
    role_delete: Joi.number(),
    role_read: Joi.number(),
  })
  const { error, value } = userSchema.validate(data)
  return { error, value }
}

const customCreation = (data: any) => {
  const customSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    // phone: Joi.number().min(10).required(),
    password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    // company: Joi.string().required(),
    role_id: Joi.number().required(),
    // custom_permission: Joi.object(),
    // status: Joi.boolean(),
    address:Joi.object(),
    permission:Joi.object(),
  })
  const { error, value } = customSchema.validate(data)
  return { error, value }
}

const addressSchema = (data: any) => {
  const customSchema = Joi.object({
    address1: Joi.string().required(),
    address2: Joi.string(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postalcode: Joi.number().required()
  })
  const { error, value } = customSchema.validate(data)
  return { error, value }
}

const customUpdation = (data: any)=>{
  const customSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    // phone: Joi.number().min(10).required(),
    password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/),
    // company: Joi.string().required(),
    role_id: Joi.number(),
    // custom_permission: Joi.object(),
    // status: Joi.boolean(),
    address:Joi.object(),
    permission:Joi.object(),
  })
  const { error, value } = customSchema.validate(data)
  return { error, value }
}

const updateAddressSchema = (data: any) => {
  const customSchema = Joi.object({
    address1: Joi.string(),
    address2: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    postalcode: Joi.number()
  })
  const { error, value } = customSchema.validate(data)
  return { error, value }
}


export default {
  register, login, userCreation, userUpdation, 
  UpdationPermissionSchema, customCreation, 
  PermissionSchema, addressSchema, customUpdation,
  updateAddressSchema
}