// TODO: update style and add token blocklist
export function generateResetPageTemplate(email: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verifying ${email}</title>
        <style>
          body { margin:0px; padding: 0px; }
          main { width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center; }
          section { padding: 25px; box-shadow: rgba(0,0,0,0.35) 0px 2px 7px; border-radius: 8px; }
        </style>
      </head>
      <body>
        <main>
          <section>
            <p>Password is sent at <b>${email}</b></p>
          </section>
        </main>
        <script>
          setTimeout(() => {
            window.close();
          }, 5000);
        </script>
      </body>
    </html>
  `;
}
