import dotenv from 'dotenv';
import path from 'path';
import joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../.env') })
const envVarsSchema = joi.object()
    .keys({
        BASE_URL:joi.string().required(),
        PORT: joi.number().default(8000),
        MONGODB_URL: joi.string().required().description('Mongo DB url'),
        JWT_TOKEN_SECRET:joi.string().required().description('JWT_TOKEN_SECRET'),
        JWT_EXPIRY_TIME:joi.string().required().description('JWT_EXPIRY_TIME'),
        JWT_TOKEN_INVITE_SECRET:joi.string().required().description('JWT_TOKEN_INVITE_SECRET'),
        RESET_TOKEN_SECRET:joi.string().required().description('RESET_TOKEN_SECRET'),
        RESET_TOKEN_EXPIRY_TIME:joi.string().required().description('RESET_TOKEN_EXPIRY_TIME'),
        MAIL_HOST:joi.string().required().description('MAIL_HOST'),
        MAIL_PORT:joi.string().required().description('MAIL_PORT'),
        MAIL_USER:joi.string().required().description('MAIL_USER'),
        MAIL_PASSWORD:joi.string().required().description('MAIL_PASSWORD'),
        MAIL_FROM:joi.string().required().description('MAIL_FROM'),

    })
    .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
export default {
    base_url:envVars.BASE_URL,
    port: envVars.PORT,
    mongoose: {
    url: envVars.MONGODB_URL
    },
    jwt: {
        secret: envVars.JWT_TOKEN_SECRET,
        expiryTime: envVars.JWT_EXPIRY_TIME,
        inviteSecret: envVars.JWT_TOKEN_INVITE_SECRET,
        
    },
    reset:{
        secret: envVars.RESET_TOKEN_SECRET,
        expiryTime: envVars.RESET_TOKEN_EXPIRY_TIME,
    },
    mail:{
        host: envVars.MAIL_HOST,
        port: envVars.MAIL_PORT,
        user: envVars.MAIL_USER,
        password: envVars.MAIL_PASSWORD,
        from: envVars.MAIL_FROM,
    }
    
};