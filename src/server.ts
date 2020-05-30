import express from 'express';
import path from 'path';
import session from 'express-session';
import methodOverride from 'method-override';
import exphbs from 'express-handlebars';

import { opremaRouter } from './routers/oprema';
import { tipoviOpremeRouter } from './routers/tipoviOpreme';
import { vaspitaciRouter } from './routers/vaspitaci';

const app = express();

app.engine('handlebars', exphbs());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(
  session({
    secret: 'secret***key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/oprema', opremaRouter);
app.use('/tipovi_opreme', tipoviOpremeRouter);
app.use('/vaspitaci', vaspitaciRouter);

app.get('/', (req, res) => res.render('index'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server pokrenut na URL-u: http://localhost:${PORT}`);
});
