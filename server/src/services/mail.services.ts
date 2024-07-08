import nodemailer from 'nodemailer';
import config from '../config/config';
import fs from 'fs';
import path from 'path';
const accountCreated = async (toUser: any) => {
    let filePath =  path.join(__dirname, '../views/email.html') 
    let data = fs.readFileSync(filePath, 'utf8');
    let emailCont = data.toString()
    let subject = emailCont.replace("${toUser.username}",toUser.user_id.username)
             .replace('${config.base_url}',config.base_url)
             .replace("${toUser.inviteToken}",toUser.inviteToken)
    let transport = nodemailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        auth: {
            user: config.mail.user,
            pass: config.mail.password
        }
    });
    let mailOptions = {
        from: config.mail.from,
        to: toUser.user_id.email,
        subject: "Account Created",
        html: subject,
    }

    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            return error;
        } else {
            return info.response;
        }
    });
}

const resetPassword = async (toUser: any) => {
    let filePath =  path.join(__dirname, '../views/forgetPassword.html') 
    let data = fs.readFileSync(filePath, 'utf8');
    let emailCont = data.toString()
    let subject = emailCont.replace("${toUser.username}",toUser.user_id.username)
             .replace('${config.base_url}',config.base_url)
             .replace("${toUser.inviteToken}",toUser.resetToken)
    let transport = nodemailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        auth: {
            user: config.mail.user,
            pass: config.mail.password
        }
    });
    let mailOptions = {
        from: config.mail.from,
        to: toUser.user_id.email,
        subject: "Reset Password",
        html: subject,
    }

    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            return error;
        } else {
            return info.response;
        }
    });
}

const organizationCreated = (toUser:any, id:any) =>{
    let filePath =  path.join(__dirname, '../views/organization.html') 
    let data = fs.readFileSync(filePath, 'utf8');
    let emailCont = data.toString()
    let subject = emailCont.replace("${toUser.username}",toUser.firstName)
             .replace('cutomerId',id)
    let transport = nodemailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        auth: {
            user: config.mail.user,
            pass: config.mail.password
        }
    });
    let mailOptions = {
        from: config.mail.from,
        to: toUser.email,
        subject: "Organization created",
        html: subject,
    }

    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            return error;
        } else {
            return info.response;
        }
    });
}
export default {
    accountCreated, resetPassword, organizationCreated
}