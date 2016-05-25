import Hapi from 'hapi';
import vision from 'vision';
import jade from 'jade';
import Path from 'path';
import inert from 'inert';
import authCookie from 'hapi-auth-cookie';

import * as route from './route';
import * as jwt from './model/jwt.js';

const server = new Hapi.Server();
server.connection({
  port: 3004,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, '../public')
    }
  }
});

server.register(vision, err => {
  server.views({
    engines: {jade: jade},
    path: Path.join(__dirname, '../views'),
    compileOptions: {
      pretty: true
    }
  });
});
server.register(inert, () => {});


server.register(require('hapi-auth-jwt2'), function (err) {
  if(err){
    console.log(err);
  }
  server.auth.strategy('jwt', 'jwt', jwt.options);
  server.auth.default('jwt');

  server.ext('onPreResponse', (request, reply) => {
    if (request.auth.mode == 'required' && !request.auth.isAuthenticated) {
      return reply.redirect('/login');
    }
    return reply.continue();
  });


  server.route([
    {
      method: 'GET',
      path: '/',
      config: {
        auth: 'jwt',
        handler: (request, reply) => {
          reply.view('app');
        }
      }
    },
    {
      method: 'GET',
      path: '/login',
      config: {
        auth: false,
        handler: route.sign.index
      }
    },
    {
      method: 'POST',
      path: '/login',
      config: {
        auth: false,
        handler: route.sign.login
      }
    },
    {
      method: 'POST',
      path: '/signup',
      config: {
        auth: false,
        handler: route.sign.signup
      }
    },
    {
      method: 'GET',
      path: '/signup/{id}/confirm',
      config: {
        handler: route.sign.confirm,
      }
    },
    {
      method: 'GET',
      path: '/logout',
      config: {
        auth: 'jwt',
        handler: route.sign.logout
      }
    },

    {
      method: 'GET',
      path: '/{param*}',
      config: {
        auth: false,
        handler: {
          directory: {
            path: '.',
            redirectToSlash: true,
            index: true
          }
        }
      }
    }
  ]);

});

server.start(err => {
  if (err) {
    throw err;
  }
  console.log(`server running at: ${server.info.uri}`);
});

