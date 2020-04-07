#!/usr/bin/env node
require('dotenv').config()

const {Transform} = require('stream')
const parse = require('csv-parser')
const getStream = require('get-stream')
const {chain} = require('lodash')
const {createGazetteer} = require('@etalab/gazetteer')

async function main() {
  const gazetteer = await createGazetteer({dbPath: process.env.GAZETTEER_DB_PATH || 'gazetteer.sqlite'})

  const rows = await getStream.array(
    process.stdin
      .pipe(parse())
      .pipe(new Transform({
        async transform(row, enc, cb) {
          const reversedRow = {...row}
          const result = await gazetteer.find({lon: row._lon, lat: row._lat})

          if (result && result.departement) {
            reversedRow.departement = result.departement
          }

          cb(null, reversedRow)
        },
        objectMode: true
      }))
  )

  const output = chain(rows)
    .filter(row => row.departement)
    .groupBy(row => row.departement.code)
    .map(rows => {
      const {nom, code} = rows[0].departement
      const count = rows.length
      return {nom, code, count}
    })
    .sortBy(row => -row.count)
    .map(row => `${row.nom} (${row.code}) : ${row.count}`)
    .value()
    .join('\n')

  console.log(output)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
