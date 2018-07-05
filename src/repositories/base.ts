import * as fs from 'fs';
import * as path from 'path';
import * as sqlite3 from 'sqlite3';

export class BaseRepository {

    protected database: sqlite3.Database = null;

    constructor() {
        this.database = new sqlite3.Database(':memory:');
    }

    public async execute(sql: string): Promise<void> {
        await this.initialize();

        await this._execute(sql);
    }

    public async query(sql: string, parameters: any): Promise<any[]> {
        await this.initialize();

        return this._query(sql, parameters);
    }

    protected async _execute(sql: string): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (error: Error) => void) => {
            this.database.exec(sql, (error: Error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }

    public _query(sql: string, parameters: any): Promise<any[]> {
        return new Promise<any[]>((resolve: (rows: any[]) => void, reject: (error: Error) => void) => {
            this.database.all(sql, parameters, (error: Error, rows: any[]) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(rows);
            });
        });
    }

    protected async initialize(): Promise<void> {
        try {
            let version: number = await this.getVersion();

            while (true) {
                version += 1;

                const scriptPath: string = path.join(__dirname, '..', '..', 'database', 'migration-scripts', `version-${version}.up.sql`);

                if (!fs.existsSync(scriptPath)) {
                    break;
                }

                const script: string = fs.readFileSync(scriptPath, 'utf-8');

                await this._execute(script);

                await this.insertVersion(version);
            }

        } catch (error) {
            if (error.message !== 'SQLITE_ERROR: no such table: VERSION') {
                throw error;
            }

            await this.createVersionTable();
            await this.initialize();
        }
    }

    protected async createVersionTable(): Promise<void> {
        await this._execute(`CREATE TABLE VERSION (
            VERSION        INT NOT NULL,
            TIMESTAMP      INT     NOT NULL
         );`);
    }

    protected async getVersion(): Promise<number> {
        const rows: any[] = await this._query('SELECT * FROM VERSION ORDER BY TIMESTAMP DESC', undefined);

        if (!rows.length) {
            return 0;
        }

        return rows[0].VERSION;
    }

    protected async insertVersion(version: number): Promise<void> {
        await this._execute(`INSERT INTO VERSION (VERSION, TIMESTAMP) VALUES (${version}, ${new Date().getTime()})`);
    }

}
