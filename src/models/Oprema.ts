import { DB } from '../db/dbServis';

class Oprema {
  public constructor(private dbServis: DB) {}
  public async vratiOpremu(text = '') {
    const sql = `CALL VratiOpremu("${text}")`;
    const rezultat = await this.dbServis.konekcija(sql);
    return rezultat;
  }

  public async unesiOpremu(naziv: string, opis: string, id_tipa: number) {
    const sql = 'INSERT INTO Oprema (naziv, opis, id_tipa) VALUES (?, ?, ?)';
    const rezultat = await this.dbServis.konekcija({
      sql,
      values: [naziv, opis, id_tipa],
    });
    return rezultat;
  }

  public async obrisiOpremu(id: number) {
    const sql = 'DELETE FROM Oprema WHERE id = "?"';
    const rezultat = await this.dbServis.konekcija({
      sql,
      values: id,
    });
    return rezultat;
  }

  public async vratiInfoOpreme(id: number) {
    const sql = 'SELECT * FROM Oprema WHERE id = "?"';
    const rezultat = await this.dbServis.konekcija({
      sql,
      values: id,
    });
    return rezultat;
  }

  public async izmeniInfoOpreme(id: number, naziv: string, opis: string) {
    const sql = 'UPDATE oprema SET naziv=?, opis=? WHERE id = "?"';
    const rezultat = await this.dbServis.konekcija({
      sql,
      values: [naziv, opis, id],
    });
    return rezultat;
  }
}

export { Oprema };
