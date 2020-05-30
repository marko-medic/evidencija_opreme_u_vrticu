import { Request, Response } from 'express';
import { Oprema } from '../models/Oprema';
import { TipOpreme } from '../models/TipOpreme';

class OpremaController {
  public constructor(private oprema: Oprema, private tipOpreme: TipOpreme) {}

  public async vratiOpremu(req: Request, res: Response) {
    const naziv = req.query.naziv as string;
    const rezultat = await this.oprema.vratiOpremu(naziv);
    const oprema = rezultat[0];
    res.render('oprema/index', { oprema });
  }

  public async dodajOpremu(req: Request, res: Response) {
    const tipoviOpreme = await this.tipOpreme.vratiTipoveOpreme();
    res.render('oprema/dodaj', { tipoviOpreme });
  }

  public async unesiOpremu(req: Request, res: Response) {
    const { naziv, opis, tip } = req.body;
    await this.oprema.unesiOpremu(naziv, opis, tip);
    res.redirect('/oprema');
  }
  public async obrisiOpremu(req: Request, res: Response) {
    const rezultat = await this.oprema.obrisiOpremu(Number(req.query.id));
    if (rezultat.affectedRows) {
      res.redirect('/oprema');
    } else {
      res.render('index', {
        poruka: 'Doslo je do greske, oprema nije obrisana',
      });
    }
  }
  public async vratiInfoOpreme(req: Request, res: Response) {
    const { idOpreme } = req.params;
    const rezultat = await this.oprema.vratiInfoOpreme(Number(idOpreme));
    const info = rezultat[0];
    if (!info) {
      return res.redirect('/oprema');
    }
    res.render('oprema/izmeni', { info });
  }

  public async izmeniInfoOpreme(req: Request, res: Response) {
    const { naziv, opis } = req.body;
    const { idOpreme } = req.params;

    const rezultat = await this.oprema.izmeniInfoOpreme(
      Number(idOpreme),
      naziv,
      opis
    );

    if (rezultat.affectedRows) {
      res.redirect('/oprema');
    } else {
      res.render('index', {
        poruka: 'Doslo je do greske, oprema nije izmenjena',
      });
    }
  }
}

export { OpremaController };
