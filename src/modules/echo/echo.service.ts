import { Injectable } from '@nestjs/common';

@Injectable()
export class EchoService {
  jsonToHtml(body: object) {
    body = this.flattenObject(body);
    const array = Object.keys(body);
    return `
    <style>
        .card {
          width: 100%;
          max-width: 320px;
          min-height: 100px;
          border-radius: 4px;
          box-shadow: rgba(0,0,0,0.35) 0px 2px 7px;
          padding: 20px;
        }
        .card h2 {
          margin: 0px;
          margin-bottom: 0.5rem;
          text-align: center;
          font-weight: 200;
        }
        .elements {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin: 0.5rem 0px;
        }
        .elements h4,
        .elements p {
          margin: 0px;
          line-break: anywhere;
        }
        h5, h6 {
          text-align: center;
          margin: 0px;
        }
        a {
          text-decoration: none;
        }
      </style>
      <div class="card">
        <h2>Echo of EverREST</h2>
        <hr>
        ${new Array(array.length)
          .fill(null)
          .map(
            (e, i) => `
          <div class="elements">
            <h4>${array[i]} : </h4>
            <p>${body[array[i]]}</p>
          </div>
        `,
          )
          .join('')}
          ${array.length === 0 ? '<h5>Nothing to display</h5>' : ''}
        <hr>
        <h6>
          Copyright © 2023-present <a href="https://everrest.educata.dev/" target="_blank">Educata</a>
        </h6>
      </div>
    `;
  }

  flattenObject(obj: object, parentKey = ''): Record<string, object> {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (
        typeof obj[key] === 'object' &&
        !Array.isArray(obj[key]) &&
        obj[key] !== null
      ) {
        Object.assign(acc, this.flattenObject(obj[key], newKey));
      } else {
        acc[newKey] = obj[key];
      }
      return acc;
    }, {});
  }
}
