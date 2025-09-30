import nodemailer from 'nodemailer';
import createHelpers from '.';
import { Mail } from './interface';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';

var transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 2525,
  auth: {
    user: process.env.SMTP_USERNAME || "150e8cd9a8a616",
    pass: process.env.SMTP_PASSWORD || "cac95744b0e522"
  }
});

export const sendMail = async (to: string, subject: string, name: string) => {

  const { user } = await strapi.documents('api::email.email').findFirst({
    populate: {
      user: {
        populate: {
          logo: true,
          image: true,
          links: true
        }
      },
    }
  })

  const from = process.env.SMTP_FROM || "vinodkv.developer@gmail.com"

  const templatePath = path.join(
    process.cwd(),
    "public",
    "email",
    "thankyou.html"
  );

  const source = fs.readFileSync(templatePath, "utf8");
  console.log('source', source);

  const template = Handlebars.compile(source);

  let data: Record<string, any> = {};
  data.title = user?.title || 'Title';
  data.name = name || '';
  data.logo = user?.logo ? createHelpers(strapi).getImageUrl(user.logo) : 'image';
  data.image = user?.image ? createHelpers(strapi).getImageUrl(user.image) : 'image';
  data.message = user?.message ?? 'Thank you for contacting, will get back to you shortly.';
  data.links = user?.links?.map(link => {
    return `
      <td style="padding: 0 10px; text-align: center;">
        <a href="${link?.url}" style="text-decoration: none; color: #008d47; font-weight: 700;">${link?.name}</a>
      </td>
    `
  }).join("");
  data.year = new Date().getFullYear();

  let html = template(data);
  
  const mailOptions = {
    from,
    to,
    subject,
    html
  }
  
  const info = await transport.sendMail(mailOptions);

  console.log('Message sent: %s', info);

};