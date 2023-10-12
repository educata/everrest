import { Injectable } from '@nestjs/common';

@Injectable()
export class EchoService {
  jsonToHtml(body: object) {
    const lines = JSON.stringify(body, null, 4);
    const html = `
<pre>
${lines} 
</pre>
    `;

    return html;
  }
}
