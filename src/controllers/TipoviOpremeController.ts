import { Request, Response } from 'express';
import { TipOpreme } from '../models/TipOpreme';

class TipoviOpremeController {
  public constructor(private tipOpreme: TipOpreme) {}

  public async vratiStranicu(req: Request, res: Response) {
    if (!req.session?.ulogovan) {
      return res.redirect('/');
    }
    res.render('tipovi_opreme/index');
  }

  public async unesiOpremu(req: Request, res: Response) {
    if (!req.session?.ulogovan) {
      process.exit();
    }
    const { tipOpreme } = req.body;
    const rezultat = await this.tipOpreme.unesiTipOpreme(tipOpreme);
    const poruka = rezultat.affectedRows
      ? 'Uspesno unet novi tip opreme'
      : 'Doslo je do greske';
    res.render('tipovi_opreme/index', { poruka });
  }
}

export { TipoviOpremeController };
