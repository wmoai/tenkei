import config from '../../config/mail.json';
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport();

export default class {
  constructor(address) {
    if (!address.match(/^[^@-]+@[^@-]+$/)) {
      throw new Error('invalid MailAddress');
    }
    this.address = address;
  }

  send(subject, message) {
    transporter.sendMail({
      from: config.admin_mailaddress,
      to: this.address,
      subject: subject,
      text: message
    });
    console.log(this.address);
  }

}

