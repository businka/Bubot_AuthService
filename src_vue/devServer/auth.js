

function sleep (ms) {
  const now = new Date().getTime();
  while (new Date().getTime() < now + ms) { /* do nothing */
  }
}

module.exports = function (app) {
  app.post('/api/auth/auth_by_login', function (req, res) {
    res.json({'session': 'ok'})
    console.log(req.data)
    // console.log(req)
    // console.log('---')
    // console.log(res)
    sleep(1000)
  })
}
