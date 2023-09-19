export function generateVerifyPageTemplate(
  user: { email: string; firstName: string; lastName: string },
  link: string,
) {
  // TODO: update style and add token blocklist
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verifying ${user.email}</title>
        <style>
          body { margin:0px; padding: 0px; }
          main { width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center; }
          section { padding: 25px; box-shadow: rgba(0,0,0,0.35) 0px 2px 7px; border-radius: 8px; }
          p { margin: 15px 0px 0px; }
          button {
            margin: 0.25rem auto;
            cursor: pointer;
            display: block;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.3;
            color: #fff;
            text-align: center;
            text-decoration: none;
            user-select: none;
            border: 1px solid #0d6efd;
            border-radius: 0.375rem;
            background-color: #0d6efd;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
          button:hover {
            background-color: #0b5ed7;
            border-color: #0a58ca;
          }
          button:disabled {
            background-color: #0d6efd;
            border-color: #0d6efd;
            opacity: 0.65;
            cursor: not-allowed;
          }
        </style>
      </head>
      <body>
        <main>
          <section>
            <h3 style="margin: 0px">Verifying user: ${user.email}</h3>
            <h4 style="margin-bottom: 0px">Hi <span style="text-transform: capitalize">${user.firstName} ${user.lastName}</span></h4>
            <p style="margin-bottom: 1.33em">To verify your account press 'Verify' button</p>
            <button>Verify</button>
          </section>
        </main>
        <script>
          const button = document.querySelector("button");
          button.addEventListener("click", function() {
            this.disabled = true;
            const xhr = new XMLHttpRequest();
            xhr.open("GET", '${link}');
            xhr.send();
            xhr.onloadend = () => {
              const result = JSON.parse(xhr.responseText);
              const p = document.querySelector("p");
              let status = result.success ? '<span style="color: green; font-weight: bold">SUCCESS</span>' : '<span style="color: red; font-weight: bold">FAILURE</span>';
              p.innerHTML = "Status: ";
              p.innerHTML += status;
              p.innerHTML += '<br>';
              p.innerHTML += "Message: ";
              p.innerHTML += result.message;
              setTimeout(() => {
                window.close();
              }, 5000);
            }
          });
        </script>
      </body>
      </html>
    `;
}
