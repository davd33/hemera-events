const Hemera = require('nats-hemera')
const HemeraStats = require('hemera-stats')
const HemeraJoi = require('hemera-joi')

const nats = require("nats").connect()

let hemera = new Hemera(nats, {
  logLevel: 'debug'
})

hemera.use(HemeraStats)
hemera.use(HemeraJoi)
hemera.setOption('payloadValidator', 'hemera-joi')

hemera.ready(() => {
  console.log('Publish Event')
  hemera.act({
    pubsub$: true,
    topic: 'on-event',
    event: 'published'
  })

  process.exit(0)
})