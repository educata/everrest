import { Injectable } from '@nestjs/common';

@Injectable()
export class EchoService {
  jsonToHtml(body: object) {
    const array = Object.keys(body);
    return `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
        body {
          margin: 0px;
          padding: 0px;
          font-family: 'Open Sans', sans-serif;
        }
        .card {
          width: 100%;
          max-width: 320px;
          min-height: 100px;
          margin: 50px auto 0px;
          border-radius: 4px;
          box-shadow: rgba(0,0,0,0.35) 0px 2px 7px;
          padding: 25px;
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
        }
        h5 {
          text-align: center;
          margin: 0px;
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
            <h4>${array[i][0].toUpperCase() + array[i].slice(1)} : </h4>
            <p>${body[array[i]]}</p>
          </div>
        `,
          )
          .join('')}
          ${array.length === 0 ? '<h5>Nothing to display</h5>' : ''}
      </div>
    `;
  }
}
