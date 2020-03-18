const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multiParty = require('connect-multiparty');
const port = 8000;

const app = express();
app.listen(port, () => console.log(`Servidor iniciado ${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const multiPartMiddleware = multiParty({ uploadDir: './uploads' });

app.post('/saveFile', multiPartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json({
    message: "Arquivo salvo com exito!"
  });
});

app.use((err, req, res, next) => res.json({error: err.message}));
