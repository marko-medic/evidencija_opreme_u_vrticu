import { DB } from '../db/dbServis';

class TipOpreme {
  public constructor(private dbServis: DB) {}

  public async vratiTipoveOpreme() {
    const sql = `SELECT * FROM tipovi_opreme`;
    const rezultat = await this.dbServis.konekcija(sql);
    return rezultat;
  }

  public async unesiTipOpreme(tipOpreme: string) {
    const sql = `INSERT INTO tipovi_opreme (naziv) VALUES (?)`;
    const rezultat = await this.dbServis.konekcija({
      sql,
      values: tipOpreme,
    });
    return rezultat;
  }
}

export { TipOpreme };
