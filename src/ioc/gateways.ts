import { Container } from 'inversify';
import { AES256CTRCipher } from '../ciphers/aes-256-ctr';
import { configuration } from '../configuration';
import { SendGridEmailGateway } from '../gateways/send-grid-email';
import { IEmailGateway } from '../interfaces/email-gateway';
import { WinstonLogger } from '../loggers/winston';

export function registerGateways(container: Container) {
    const sendGridKey: string = new AES256CTRCipher(configuration.sendGrid.password).decrypt(configuration.sendGrid.encryptedAPIKey);
    container.bind<IEmailGateway>('IEmailGateway').toConstantValue(new SendGridEmailGateway(sendGridKey, new WinstonLogger()));
}
