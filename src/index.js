import Hapi from 'hapi';
import vision from 'vision';
import jade from 'jade';
import Path from 'path';
import inert from 'inert';
import auth from 'hapi-auth-cookie';

import * as route from './route';

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
server.register(auth, err => {
  server.auth.strategy('session', 'cookie', {
    password: 'ab976c9bbdafalsfjlafda89892skd63034e0c7484306a8714e8ab5',
    cookie: 'sid-example',
    redirectTo: '/login',
    isSecure: false
  });
});
server.register(inert, () => {});

server.route([
  {
    method: 'GET',
    path: '/',
    config: {
      handler: (request, reply) => {
        reply.view('index');
      },
      auth: 'session'
    }
  },
  {
    method: 'GET',
    path: '/login',
    config: {
      handler: route.sign.index,
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/login',
    config: {
      handler: route.sign.login,
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/signup',
    config: {
      handler: route.sign.signup,
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
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
      handler: route.sign.logout,
      auth: 'session'
    }
  },

  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  }
]);

server.start(err => {
  if (err) {
    throw err;
  }
  console.log(`server running at: ${server.info.uri}`);
});

