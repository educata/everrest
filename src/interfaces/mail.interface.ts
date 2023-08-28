export interface Mail {
  email: string;
  subject: string;
  template: string;
  context: {
    [key: string]: string | number | boolean;
  };
}
