import sqlite3 from "sqlite3";
import path from "path";
import { Shopify } from "@shopify/shopify-api";

const DEFAULT_DB_FILE = path.join(process.cwd(), "social_midea_icon_db.sqlite");
const DEFAULT_PURCHASE_QUANTITY = 1;

export const SocialMideaIconDb = {
    socialMideaIconsTableName: "social_midea_icon",
    db: null,
    ready: null,

    create: async function ({
        platformName,
        platformUrl,
    }) {
        await this.ready;

        const query = `
      INSERT INTO ${this.socialMideaIconsTableName}
      (platformName, platformUrl)
      VALUES (?, ?)
      RETURNING id;
    `;

        const rawResults = await this.__query(query, [
            platformName,
            platformUrl,
        ]);

        return rawResults[0].id;
    },

    update: async function (
        id,
        {
            platformName,
            platformUrl,
        }
    ) {
        await this.ready;

        const query = `
      UPDATE ${this.socialMideaIconsTableName}
      SET
        platformName = ?,
        platformUrl = ?,
      WHERE
        id = ?;
    `;

        await this.__query(query, [
            platformName,
            platformUrl,
            id,
        ]);
        return true;
    },

    list: async function () {
        await this.ready;
        const query = `
      SELECT * FROM ${this.socialMideaIconsTableName}
    `;
        return results.map((socialmideaicon) => this.__addIconUrl(socialmideaicon));
    },

    read: async function (id) {
        await this.ready;
        const query = `
      SELECT * FROM ${this.socialMideaIconsTableName}
      WHERE id = ?;
    `;
        const rows = await this.__query(query, [id]);
        if (!Array.isArray(rows) || rows?.length !== 1) return undefined;

        return this.__addIconUrl(rows[0]);
    },

    delete: async function (id) {
        await this.ready;
        const query = `
      DELETE FROM ${this.socialMideaIconsTableName}
      WHERE id = ?;
    `;
        await this.__query(query, [id]);
        return true;
    },



    /* Private */

    /*
      Used to check whether to create the database.
      Also used to make sure the database and table are set up before the server starts.
    */

    __hasSocialMideaIconTable: async function () {
        const query = `
      SELECT name FROM sqlite_schema
      WHERE
        type = 'table' AND
        name = ?;
    `;
        const rows = await this.__query(query, [this.socialMideaIconsTableName]);
        return rows.length === 1;
    },

    /* Initializes the connection with the app's sqlite3 database */
    init: async function () {

        /* Initializes the connection to the database */
        this.db = this.db ?? new sqlite3.Database(DEFAULT_DB_FILE);

        const hasSocialMideaIconTable = await this.__hasSocialMideaIconTable();

        if (hasSocialMideaIconTable) {
            this.ready = Promise.resolve();

            /* Create the QR code table if it hasn't been created */
        } else {
            const query = `
        CREATE TABLE ${this.socialMideaIconsTableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          platformName VARCHAR(511) NOT NULL,
          platformUrl VARCHAR(255) NOT NULL,
          createdAt DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
        )
      `;

            /* Tell the various CRUD methods that they can execute */
            this.ready = this.__query(query);
        }
    },

    /* Perform a query on the database. Used by the various CRUD methods. */
    __query: function (sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },

};
