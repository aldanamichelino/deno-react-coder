// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
import {useState, useEffect} from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();

const [color, setColor] = useState('');
const [colors, setColors] = useState([]);

const handleSubmit = (e) => {
  e.preventDefault();
  setColors([...colors, color]);
  setColor('');
}

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous"></link>
          <title>Desafío 20 Coderhouse</title>
        </head>
        <body>
            <form action="/addColor" method="POST" onSubmit={handleSubmit}>
                <label htmlFor="color">Introduce un color</label>
                <input type="text" name="color" id="color" />
                <button type="submit">Agregar color</button>
            </form>
            <ul className="mt-10 bg-dark">
              {colors.map((color: string) => {
                  <li style={{color: color}}>{color}</li>
              })}
            </ul>
        </body>
      </html>,
    ),
  });
});
app.listen({ port: 3000 });