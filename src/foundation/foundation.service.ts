import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-mail.dto';
import { DatabaseService } from 'src/database/database.service';
import { EmailService } from 'src/email/email.service';
import { replaceText } from 'src/utiltiy';

type template = {
  subject: string;
  message: string;
};

type Nonprofit = {
  email: string;
  name: string;
  address: string;
};

@Injectable()
export class FoundationService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly emailService: EmailService,
  ) {}
  async sendEmails(sendEmailDto: SendEmailDto): Promise<void> {
    const { from, sender_id, template_id, type = '', cc } = sendEmailDto;

    const query1 = `
      SELECT
        t.subject, t.message
      FROM templates t
      WHERE t.id = $1;
    `;

    const query2 = `
      SELECT
        n.email as email,
        n.name as name,
        n.address as address
      FROM foundation_nonprofit fn
      INNER JOIN
        nonprofits n
      ON n.id = fn.nonprofit_id
      WHERE fn.foundation_id = $1;
    `;

    try {
      const result: template[] = await this.databaseService.executeQuery(
        query1,
        [template_id],
      );
      const { subject, message } = result[0];
      const nonprofits: Nonprofit[] = await this.databaseService.executeQuery(
        query2,
        [sender_id],
      );

      for (const { email, name, address } of nonprofits) {
        await this.emailService.sendEmail({
          to: email,
          from,
          sender_id,
          template_id,
          subject,
          message: replaceText(message, {
            name: name,
            address: address,
          }),
          cc,
        });
      }
    } catch (error) {
      console.error(
        `Failed to send emails and error message is:`,
        error.message,
      );
    } finally {
    }
  }
}
