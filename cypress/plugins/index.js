/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const Tedious = require('tedious');
// const Client = require('@infosimples/node_two_captcha');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task',  {
    sqlServer(sql) {
      return execSQL(sql, config.env.db)
    }
  });

  on('task',  {
    sqlServerTriton(sql) {
      return execSQL(sql, config.env.dbTriton)
    }
  });

  /*client = new Client('60b501bf06aba3552eb057e307365ab0', {
    timeout: 60000,
    polling: 5000,
    throwErrors: false});*/
}

function execSQL(sql, config) {
  const connection = new Tedious.Connection(config);
  return new Promise((res, rej) => {
    connection.on('connect', err => {
      if (err) {
        rej(err);
      }

      const request = new Tedious.Request(sql, function (err, rowCount, rows) {
        return err ? rej(err) : res(rows);
      });

      connection.execSql(request);
    });
  })
}
