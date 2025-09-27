import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import createHelpers from '.';
import Handlebars from 'handlebars';

var transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 2525,
  auth: {
    user: process.env.SMTP_USERNAME || "150e8cd9a8a616",
    pass: process.env.SMTP_PASSWORD || "cac95744b0e522"
  }
});

export const sendMailAdmin = async (to: string, subject: string, { name, email, phone, sub, message }) => {

  const { admin } = await strapi.documents('api::email.email').findFirst({
    populate: {
      admin: {
        populate: {
          logo: true,
          image: true,
          links: true
        }
      }
    }
  })

  const from = process.env.SMTP_FROM || ""

  const templatePath = path.join(
    process.cwd(),
    "public",
    "email",
    "admin.html"
  );

  const source = fs.readFileSync(templatePath, "utf8");
  console.log('source', source);

  const template = Handlebars.compile(source);

  let data: Record<string, any> = {};
  data.title = admin?.title || 'Title';
  data.name = name || '';
  data.email = email || '';
  data.phone = phone || '';
  data.subject = subject || '';
  data.message = message || '';
  data.logo = admin?.logo ? createHelpers(strapi).getImageUrl(admin.logo) : 'image';
  data.message = admin?.message ?? 'Thank you for contacting, will get back to you shortly.';
  data.links = admin?.links?.map(link => {
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