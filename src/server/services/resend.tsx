'use server';

import { SendMessageTemplate } from "../email/send-message";

import { CreateEmailResponse, Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export const sendContactEmail = async (
  message: string
): Promise<CreateEmailResponse> => {
  const resend = new Resend(RESEND_API_KEY);

  return await resend.emails.send({
    from: "ElFrontend <contact@elfrontend.com>",
    to: "elfrontendoficial@gmail.com",
    subject: "Contact Email",
    react: <SendMessageTemplate message={message} />,
  });
};
