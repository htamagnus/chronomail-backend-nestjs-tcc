interface Recipient {
  email: string;
  name: string;
}

interface From {
  email: string;
  name: string;
}

interface Content {
  type: string;
  value: string;
}

export interface SendEmailInterface {
  from: From;
  to: Recipient[];
  cc?: Recipient[];
  bcc?: Recipient[];
  subject: string;
  html: string;
  text: string;
}
