import { DB } from '../db/dbServis';

class Vaspitac {
  public constructor(private dbServis: DB) {}

  public async login(korisnickoIme: string, lozinka: string) {
    const sql = `SELECT * FROM vaspitaci WHERE korisnicko_ime = ? AND lozinka = ? LIMIT 1`;
    const rezultat = await this.dbServis.konekcija({
      sql,
      values: [korisnickoIme, lozinka],
    });
    return rezultat;
  }
}

export { Vaspitac };
