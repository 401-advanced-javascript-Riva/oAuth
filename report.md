OAuth Comparative Analysis

## OAuth Provider Name: Wordpress

### Research Conducted By: Sara Russert, Riva Davidowski, Czarl Jalos, Kevin McNeil

### Overall Score and Comments
#### Score (Out of 10): 8
#### General Comments
We have a single form, so that we can have a frontend to take us to our redirect route. When we click authorize through our auth provider, a code is generated and sent to the OAuth route (our redirect route). Before anything is in the browser, OAuth uses the code to get the token. In a real world application, we would not just receive an access token, but would be redirected to a webpage. Superagent assists us in swapping the code for the access token. The code is given to us from the Auth server. We then take that code and use superagent to post to the auth server to get the access token.

#### Pros
* Wordpress Docs were easier to understand than most
* We had starter code to get us going and overall understanding of basics that were needed

#### Cons
* Documentation out there for oauth is extensive
* Small mistakes in request bodies or response types caused issues. The fixes were simple but they were easy to miss.


#### Systems Requirements
A user needs a local server set up and access to an API client to make the process smoother. The server would be configured to use the public folder for static files.
=


#### Ramp-Up Projections
We started off believing this would be about 2 hrs here. It ended up being like 4 as there is so much
documentation to get through and with any coding, small errors in formatting can make a huge difference here.


#### Community Support and Adoption levels
This framework seems extremely popular and a lot of smaller scale apps are using it to avoid having to house sensitive credintials on their own servers so it seems like there is a lot of support.


### Links and Resources
* [Express](http://expressjs.com/en/starter/installing.html)
* [OAuth2 Documentaton](https://developer.wordpress.com/docs/oauth2/)
* [Okta](https://www.oauth.com/oauth2-servers/server-side-apps/authorization-code/#clients-authorization-interface)
* [superagent](https://www.npmjs.com/package/superagent)

### Code Demos
* [live/running application](http://xyz.com)
* [code repository](http://xyz.com)

### Operating Instructions
If someone were to download your repo (above), what steps do they need to take to run the application
You will need to install the following on your machine:

- `npm init -y `
- **The entry point for this app is: `index.js`**
- `npm install` for the following:
    - `bcrypt`
    - `dotenv`
    - `cors`
    -  `express`
    -  `superagent`
    -  
**Start server:**
   
```
 /* give it a port number and optionally pass a function to call when app
     starts listening on given port*/

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

```

### env Requirements:

PORT=3001

CLIENT_ID=

CLIENT_SECRET=

REDIRECT_URI=http://localhost:3001/oauth

TOKEN_SERVER_URL=

