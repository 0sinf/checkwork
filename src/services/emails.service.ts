import Mail = require("nodemailer/lib/mailer");
import * as nodemailer from "nodemailer";
import { Service } from "typedi";

import config from "../config";

interface EmailOpts {
  to: string;
  subject: string;
  html: string;
}

@Service()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: config.email.service,
      auth: {
        user: config.email.auth.user,
        pass: config.email.auth.pass,
      },
    });
  }

  async sendValidationMail(email: string, validationKey: string) {
    const baseUrl = config.email.baseUrl;

    const url = `${baseUrl}/api/users/verify?validationKey=${validationKey}`;

    const mailOpts: EmailOpts = {
      to: email,
      subject: "이메일 인증 메일입니다.",
      html: `
        <h1>이메일 인증</h1>
        인증 버튼을 누르시면 이메일 인증이 완료됩니다. <br />
        <form action="${url}" method="POST">
          <button>이메일 인증</button>
        </form>
      `,
    };

    return await this.transporter.sendMail(mailOpts);
  }
}
