import { EmailTemplate } from '@/components/email-template';
//import type { NextApiRequest, NextApiResponse } from 'next';

import { Resend } from 'resend';

const resend = new Resend("re_UMAeQRC7_J6FeLUDaZEkCutVKH4mJBTG");

const handler = async () => {

    const { } = await resend.emails.send({
      from: 'Drasko <kosovic.drasko@resend.dev>',
      to: 'drasko.kosovic@gmail.com',
      subject: 'Dobar dan',
      react: await EmailTemplate({ firstName: 'Kosoviću' }),
    });


};

export default handler;
