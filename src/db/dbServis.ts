import mysql from 'mysql';
import { promisify } from 'util';

class DB {
  private host = 'localhost';
  private username = 'root';
  private password = '';
  private baza = 'evidencija_opreme_u_vrticu';
  private _pool: mysql.Pool;
  private _konekcija: (arg1: string | mysql.QueryOptions) => Promise<any>;

  public constructor() {
    this._pool = mysql.createPool({
      host: this.host,
      user: this.username,
      password: this.password,
      database: this.baza,
    });

    this._konekcija = promisify(this._pool.query).bind(this._pool);
  }

  public get konekcija() {
    return this._konekcija;
  }

  public zatvoriKonekciju() {
    const poolEnd = promisify(this._pool.end).bind(this._pool);
    poolEnd();
  }
}

export { DB };
