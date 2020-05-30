import { Router } from 'express';
import { VaspitaciController } from '../controllers/VaspitaciController';
import { DB } from '../db/dbServis';
import { Vaspitac } from '../models/Vaspitac';

const vc = new VaspitaciController(new Vaspitac(new DB()));

const vaspitaciRouter = Router();

vaspitaciRouter.get('/login', vc.loginStranica.bind(vc));
vaspitaciRouter.post('/login', vc.login.bind(vc));
vaspitaciRouter.get('/logout', vc.logout.bind(vc));

export { vaspitaciRouter };
