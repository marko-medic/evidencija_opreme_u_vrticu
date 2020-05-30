import { Router } from 'express';
import { OpremaController } from '../controllers/OpremaController';
import { Oprema } from '../models/Oprema';
import { DB } from '../db/dbServis';
import { TipOpreme } from '../models/TipOpreme';

const opremaRouter = Router();
const db = new DB();
const oc = new OpremaController(new Oprema(db), new TipOpreme(db));

opremaRouter.get('/', oc.vratiOpremu.bind(oc));
opremaRouter.get('/dodaj', oc.dodajOpremu.bind(oc));
opremaRouter.post('/unesi', oc.unesiOpremu.bind(oc));
opremaRouter.delete('/', oc.obrisiOpremu.bind(oc));
opremaRouter.get('/:idOpreme', oc.vratiInfoOpreme.bind(oc));
opremaRouter.put('/:idOpreme', oc.izmeniInfoOpreme.bind(oc));

export { opremaRouter };
