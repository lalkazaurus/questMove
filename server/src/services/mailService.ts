import dotenv from 'dotenv'
import nodemailer, { Transporter } from 'nodemailer'
dotenv.config()

class MailService {
	private transporter: Transporter

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}

	async sendActivationMail(to: string, link: string): Promise<void> {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'Your account is activated on ' + process.env.API_URL,
			text: '',
			html: `
                <div>
                    <h1>To activate your account please click on the link below</h1>
                    <a href="${link}">${link}</a>
                </div>
            `,
		})
	}
}

export default new MailService()
