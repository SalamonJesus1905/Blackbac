import nodemailer from 'nodemailer';
import config from '../config/config.ts';
import fs from 'fs';
import path from 'path';
const accountCreated = async (toUser: any) => {
    let filePath =  path.join(__dirname, '../views/email.html') 
    let data = fs.readFileSync(filePath, 'utf8');
    let emailCont = data.toString()
    let subject = emailCont.replace("${toUser.username}",toUser.username)
             .replace('${config.base_url}',config.base_url)
             .replace("${toUser.inviteToken}",toUser.inviteToken)
    let transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "eb7378dc303fc4",
            pass: "32d5764f6a074a"
        }
    });
    let mailOptions = {
        from: "superadmin@colanonline.com",
        to: toUser.email,
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

export default {
    accountCreated
}