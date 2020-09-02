import express from 'express'
import path from 'path'
import template from './src/template'
import ssr from './src/server'
import data from './assets/data.json'

const app = express()

// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(process.env.PORT || 3000, function(){console.log('run at ' + this.address().port, app.settings.env)});

let initialState = {
  isFetching: false,
  spaces: data
}

// server rendered home page
app.get('/', (req, res) => {
  const { preloadedState, content}  = ssr(initialState)
  const response = template("Server Rendered Page", preloadedState, content)
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response);
});

// Pure client side rendered page
app.get('/', (req, res) => {
  let response = template('Client Side Rendered page')
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response)
});
