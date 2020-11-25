import { AdminApi, PublicApi } from '@oryd/hydra-client';
import express from 'express';
import bodyParser from 'body-parser';

const hydraAdmin = new AdminApi({basePath: 'http://localhost:4445'});
const hydraPublic = new PublicApi({basePath: 'http://localhost:4444'});
// hydraAdmin.createOAuth2Client({
//   client_name: "Test client",
//   redirect_uris: [
//     "http://localhost:3000/callback"
//   ],
// grant_types: [
//   'authorization_code', 
//   'refresh_token'
// ],
// response_types: [
//   'code','id_token',
// ]
// }).then(data => console.log(data));

// hydraAdmin.listOAuth2Clients().then(data => console.log(JSON.stringify(data.data, null, 2)));
// hydraAdmin.updateOAuth2Client('c2d41a9c-ebd5-414a-bc6a-5ae84ae73527', {
//   redirect_uris: [
//     'http://localhost:3000/callback'
//   ]
// })

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'pug')

app.get('/login', async (req, res, next) => {
  const challenge = String(req.query.login_challenge);
  if (!challenge) {
    next(new Error('Need a login challenge'));
  }

  const { data: getLoginRequestData } = await hydraAdmin.getLoginRequest(challenge);
  if (getLoginRequestData.skip) {
    const {data: acceptLoginRequestData } = await hydraAdmin.acceptLoginRequest(challenge, {
      subject: String(getLoginRequestData.subject)
    });
    return res.redirect(acceptLoginRequestData.redirect_to);
  }

  res.render('login', {
    challenge,
  });
})

app.post('/login', async (req, res, next) => {
  try {
    const { challenge, email, password } = req.body;
    if (email !== 'root' || password !== 'root') {
      next(new Error('bluh'));
    }

    const {data: acceptLoginRequestData } = await hydraAdmin.acceptLoginRequest(challenge, {
      subject: "foo@bar.com",
      remember: true,
      remember_for: 3600, // 1 hour
    });
    console.log(acceptLoginRequestData)
    return res.redirect(acceptLoginRequestData.redirect_to);
  } catch(e) {
    console.log(e);
  }
});

app.get('/consent', async (req, res, next) => {
  try {
    const challenge = String(req.query.consent_challenge);
    if (!challenge) {
      next(new Error('Need a consent challenge'));
    }
    const {data: getConsentRequestData} = await hydraAdmin.getConsentRequest(challenge);
    console.log(getConsentRequestData);
    if (getConsentRequestData.skip) {
      const {data: acceptConsentRequestData} = await hydraAdmin.acceptConsentRequest(challenge, {
        grant_scope: getConsentRequestData.requested_scope,
        grant_access_token_audience: getConsentRequestData.requested_access_token_audience,
      })
      return res.redirect(acceptConsentRequestData.redirect_to);
    }

    return res.render('consent', {
      challenge,
      requestedScopes: getConsentRequestData.requested_scope,
    });
  } catch(e) {
    console.log(e);
  }
});

app.post('/consent', async (req, res) => {
  console.log(req.body);
  const { challenge, grant_scope, submit } = req.body;
  if (submit === 'Accept') {
    let grantScope = grant_scope
    if (!Array.isArray(grantScope)) {
      grantScope = [grantScope]
    }

    const {data: getConsentRequestData} = await hydraAdmin.getConsentRequest(challenge);
    const {data: acceptConsentRequestData } = await hydraAdmin.acceptConsentRequest(challenge, {
      grant_scope: grantScope,
      grant_access_token_audience: getConsentRequestData.requested_access_token_audience,
      remember: true,
      remember_for: 3600 // 1 hour
    })
    return res.redirect(acceptConsentRequestData.redirect_to);
  } else {
    const {data: rejectConsentRequestData} = await hydraAdmin.rejectConsentRequest(challenge, {
      error: 'access_denied',
      error_description: 'The resource owner denied the request'
    });
    return res.redirect(rejectConsentRequestData.redirect_to);
  }
})

app.get('/error', (req, res) => {
  const error = req.query.error || '';
  const errorDescription = req.query.error_description || '';
  const errorHint = req.query.error_hint || '';
  res.render('error', { error, errorDescription, errorHint });
})

app.listen(3000, () => console.log('Express server running'));

