// html skeleton provider
export default function template(title, initialState = {}, content = "") {
  let scripts = ''; // Dynamically ship scripts based on render type
  if (content) {
    scripts = ` <script>
                   window.__STATE__ = ${JSON.stringify(initialState)}
                </script>
                <script src="assets/client.js"></script>
                `
  } else {
    scripts = ` <script src="assets/bundle.js"> </script> `
  }
  let page = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <title> ${title} </title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="assets/style.css">
              </head>
              <body>

                   <div id="app">
                      ${content}
                   </div>
                   
                  ${scripts}
              </body>
              `;

  return page;
}
