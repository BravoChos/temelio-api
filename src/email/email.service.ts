import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SendEmailDto } from './dto/send-email.dto';
import { SendEmailsDto } from './dto/send-emails.dto';
import { CreateEmailLogDto } from './dto/create-email-log.dto';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor(private readonly databaseService: DatabaseService) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
  async findEmailLogsById(id: string) {
    const query = `SELECT * FROM email_logs el WHERE el.sender_id = $1;`;
    try {
      const result = await this.databaseService.executeQuery(query, [id]);
      return result;
    } catch (err) {
      return {
        message: 'error',
      };
    }
  }

  async sendEmail({
    to,
    from,
    sender_id,
    template_id,
    subject,
    message,
  }: SendEmailDto): Promise<void> {
    const email: sgMail.MailDataRequired = {
      to,
      from,
      subject,
      text: message,
    };
    try {
      // ******** TODO: need to work *********
      // await sgMail.send(email);
      console.log(`Email sent to ${to}`);
      await this.createEmailLog({
        to,
        from,
        sender_id,
        template_id,
        status: 'DELIVERED',
      });
    } catch (error) {
      console.error(
        `Failed to send email and error message is:`,
        error.message,
      );
      await this.createEmailLog({
        to,
        from,
        sender_id,
        template_id,
        status: 'FAILED',
      });
    }
  }

  async sendEmails({
    emails,
    from,
    sender_id,
    template_id,
    subject,
    message,
  }: SendEmailsDto): Promise<void> {
    for (const email of emails) {
      this.sendEmail({
        to: email,
        from,
        sender_id,
        template_id,
        subject,
        message,
      });
    }
  }

  async createEmailLog({
    to,
    from,
    sender_id,
    template_id,
    status,
  }: CreateEmailLogDto) {
    const query = `
      INSERT INTO email_logs ("to", "from", sender_id, template_id, "status")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    try {
      const result = await this.databaseService.executeQuery(query, [
        to,
        from,
        sender_id,
        template_id,
        status,
      ]);
      return result[0];
    } catch (err) {
      return {
        message: 'error',
      };
    }
  }
}
