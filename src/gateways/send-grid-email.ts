import axios from 'axios';
import { IEmailGateway } from '../interfaces/email-gateway';

export class SendGridEmailGateway implements IEmailGateway {

    constructor(
        protected apiKey: string,
    ) {
    }

    public async send(body: string, from: string, subject: string, to: string): Promise<void> {
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