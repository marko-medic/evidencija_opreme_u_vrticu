import { Router } from 'express';
import { TipoviOpremeController } from '../controllers/TipoviOpremeController';
import { DB } from '../db/dbServis';
import { TipOpreme } from '../models/TipOpreme';

const toc = new TipoviOpremeController(new TipOpreme(new DB()));

const tipoviOpremeRouter = Router();

tipoviOpremeRouter.get('/', toc.vratiStranicu.bind(toc));
tipoviOpremeRouter.post('/', toc.unesiOpremu.bind(toc));

export { tipoviOpremeRouter };
