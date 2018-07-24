import axios from 'axios';
import { ResilientHelper } from '../helpers/resilient';
import { IEmailGateway } from '../interfaces/email-gateway';
import { ILogger } from '../interfaces/logger';

export class SendGridEmailGateway implements IEmailGateway {
  constructor(protected apiKey: string, protected logger: ILogger) {}

  public async send(body: string, from: string, subject: string, to: string): Promise<void> {
    this.logger.info(`sending email, '${subject}', to ${to}`, null);

    // TODO: Remove this!!
    to = 'developersworkspace@gmail.com';

    ResilientHelper.retry<void>(3, async () => {
      this._send(body, from, subject, to);
    });
  }

  protected async _send(body: string, from: string, subject: string, to: string): Promise<void> {
    const result: any = await axios({
      data: {
        content: [
          {
            type: 'text/html',
            value: body,
          },
        ],
        from: {
          email: from,
        },
        personalizations: [
          {
            subject,
            to: [
              {
                email: to,
              },
            ],
          },
        ],
      },
      headers: {
        authorization: `bearer ${this.apiKey}`,
      },
      method: 'POST',
      url: 'https://api.sendgrid.com/v3/mail/send',
    });
  }
}
