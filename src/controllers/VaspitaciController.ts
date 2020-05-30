import { Request, Response } from 'express';
import { Vaspitac } from '../models/Vaspitac';

class VaspitaciController {
  public constructor(private vaspitac: Vaspitac) {}

  public async login(req: Request, res: Response) {
    const { korisnickoIme, lozinka } = req.body;
    const rezultat = await this.vaspitac.login(korisnickoIme, lozinka);
    if (rezultat.length > 0 && req.session) {
      req.session.ulogovan = true;
      res.redirect('/');
    } else {
      res.render('index', { poruka: 'Prijava nije uspela' });
    }
  }

  public loginStranica(req: Request, res: Response) {
    res.render('vaspitaci/index');
  }

  public async logout(req: Request, res: Response) {
    req.session?.destroy(() => {
      console.log('Sesija obrisana');
      res.redirect('login');
    });
  }
}

export { VaspitaciController };
