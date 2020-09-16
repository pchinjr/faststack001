let tiny = require('tiny-json-http')
let arc = require('@architect/functions')


let sendCourier = async function (req) {
  let body = req.body

  console.log(body)

  let url = 'https://api.trycourier.app/send'

  let headers = {
    "authorization": `Bearer ${process.env.COURIER_AUTH_TOKEN}`,
    "content-type": "application/json",
  }

  let data = {
    event: 'praisecage',
    recipient: 'pchinjr',
    profile: {
      slack: {
        access_token: `${process.env.SLACK_TOKEN}`,
        email: 'pchinjr@gmail.com',
      }
    },
    data: {
      name: `${body.name}`,
      email: `${body.email}`,
      subject: `${body.subject}`,
      message: `${body.message}`,
      urgent: `${body.urgent}`
    }
  }

  let response = await tiny.post({ url, data, headers })

  console.log(response)
}

let route = async function (req) {
  return {
    location: '/'
  }
}

exports.handler = arc.http.async(sendCourier, route)