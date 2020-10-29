'use strict';

const superagent = require('superagent');
const users = require('./users.js');

/*
  Resources
  https://developer.github.com/apps/building-oauth-apps/
*/

const tokenServerUrl = process.env.TOKEN_SERVER_URL;
const remoteAPI = process.env.REMOTE_API;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = process.env.API_SERVER;

module.exports = async function authorize(req, res, next) {

  try {
    let code = req.query.code;
    console.log('(1) CODE:', code);

    let remoteToken = await exchangeCodeForToken(code);
    console.log('(2) ACCESS TOKEN:', remoteToken)

    let remoteUser = await getRemoteUserInfo(remoteToken);
    console.log('(3) GITHUB USER', remoteUser)

    let [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;
    console.log('(4) LOCAL USER', user);

    next();
  } catch (e) { next(`ERROR: ${e.message}`) }

}

async function exchangeCodeForToken(code) {
//tries to call post to tokenServerUrl and that is giving us bad request
const tokenRequest = {
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: code
  }

console.log('tokenRequest',tokenRequest);
console.log('token server url', tokenServerUrl);
//instead of sending as json query, I am sending the token request as x-www-form-urlencoded
let tokenResponse = await superagent.post(tokenServerUrl).type('form').send(tokenRequest);

  let access_token = tokenResponse.body.access_token;

  return access_token;

}

async function getRemoteUserInfo(token) {

  let userResponse =
    await superagent.get(remoteAPI)
      .set('user-agent', 'express-app')
      .set('Authorization', `token ${token}`)

  let user = userResponse.body;

  return user;

}

async function getUser(remoteUser) {
  let userRecord = {
    username: remoteUser.login,
    password: 'oauthpassword'
  }

  let user = await users.save(userRecord);
  let token = users.generateToken(user);

  return [user, token];

}