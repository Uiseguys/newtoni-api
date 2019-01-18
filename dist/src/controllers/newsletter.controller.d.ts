import { Newsletter } from '../models';
import { NewsletterRepository } from '../repositories';
export declare class NewsletterController {
    newsletterRepository: NewsletterRepository;
    constructor(newsletterRepository: NewsletterRepository);
    create(newsletter: Newsletter): Promise<Newsletter>;
}
