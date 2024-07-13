import nodemailer from "nodemailer";

export const sendMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: "noreply@smile-movies.uz",
        pass: "17.03.2009aA",
      },
    });

    await transporter.sendMail({
      from: { address: "noreply@smile-movies.uz", name: "Testing" },
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email sent error: " + error);
  }
};
