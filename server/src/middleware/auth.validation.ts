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
    role: Joi.string().required(),
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
    role: Joi.string().required(),
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
    role: Joi.string(),
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
    role: Joi.string().required(),
    // custom_permission: Joi.object(),
    // status: Joi.boolean(),
    address: Joi.object(),
    permission: Joi.object(),
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

const customUpdation = (data: any) => {
  const customSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    // phone: Joi.number().min(10).required(),
    password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/),
    // company: Joi.string().required(),
    role: Joi.string(),
    // custom_permission: Joi.object(),
    // status: Joi.boolean(),
    address: Joi.object(),
    permission: Joi.object(),
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

const organizationSchema = (data: any) => {
  const customSchema = Joi.object({
    user_id: Joi.string(),
    customerId: Joi.string(),
    companyName: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    phoneNo: Joi.number().min(10).required(),
    mobileNo: Joi.number().min(10),
    jobTitle: Joi.string(),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    continent: Joi.string().required(),
    postCode: Joi.number().required(),
    status: Joi.boolean().required(),
    adminPermission: Joi.string(),
  })
  const { error, value } = customSchema.validate(data)
  return { error, value }
}

const emailTemplates = (data: any) => {
  const emailSchema = Joi.object({
    templateName: Joi.string().required(),
    subject: Joi.string().required(),
    title: Joi.string().required(),
    contentInitial: Joi.string().required(),
    content: Joi.string().required(),
    footerContent: Joi.string().required(),
    footer: Joi.string().required()
  })
  const { error, value } = emailSchema.validate(data)
  return { error, value }
}

const emailUpdateTemplates = (data: any) => {
  const emailSchema = Joi.object({
    templateName: Joi.string(),
    subject: Joi.string(),
    title: Joi.string(),
    contentInitial: Joi.string(),
    content: Joi.string(),
    footerContent: Joi.string(),
    footer: Joi.string()
  })
  const { error, value } = emailSchema.validate(data)
  return { error, value }
}

export default {
  register, login, userCreation, userUpdation,
  UpdationPermissionSchema, customCreation,
  PermissionSchema, addressSchema, customUpdation,
  updateAddressSchema, organizationSchema, 
  emailTemplates, emailUpdateTemplates
}