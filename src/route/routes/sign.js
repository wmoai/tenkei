import sha1 from 'sha1';
import moment from 'moment';
import Boom from 'boom';
import * as model from '../../model';
import Mail from '../../model/mail';

export function index(request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/');
  }
  reply.view('login', request.payload);
}

export function login(request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/');
  }
  try {
    if (!request.payload) {
      throw Boom.badRequest();
    }
    const address = request.payload.mail;
    const password = request.payload.password;

    model.user.findOne({where: {mail: address}})
    .then(user => {
      if (!user) {
        return model.sequelize.Promise.reject(Boom.badRequest('Login failed.'));
      }
      const hash = sha1(password + user.solt);
      if (hash != user.password_hash) {
        return model.sequelize.Promise.reject(Boom.badRequest('Login failed.'));
      }
      request.cookieAuth.set({
        id: user.id,
        mail: user.mail
      });
      return reply.redirect('/');
    });

  } catch (e) {
    return reply.view('login', {
      mail: address,
      message: e.message
    });
  }

}


export function signup(request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/');
  }
  const address = request.payload.mail
  try {
    const mail = new Mail(address);
    const password = request.payload.password;
    const password_again = request.payload.password_again;

    if (password.length == 0 || password != password_again) {
      throw new Error('invalid Password');
    }

    model.user.findOne({where: {mail: mail.address}})
    .then(user => {
      if (user) {
        return model.sequelize.Promise.reject(Boom.badRequest('This MailAddress is already used.'));
      }
    }).then(() => {
      return model.validUser.destroy({where: {mail: mail.address}})
    }).then(count => {
      const solt = sha1(Math.random());
      const passwordHash = sha1(password+solt);
      return model.validUser.create({
        id: sha1(Math.random()),
        mail: mail.address,
        password_hash: passwordHash,
        solt: solt,
        createdAt: moment().format('YYYY/MM/DD HH:mm:ss')
      });
    }).then(validUser => {
      if (!validUser) {
        return model.sequelize.Promise.reject(Boom.badImplementation('Register error'));
      }
      mail.send(
        'TENKEI ユーザ登録確認',
        `http://${request.info.host}/signup/${validUser.id}/confirm`
      );
      return reply.view('sendmail');
    });

  } catch (e) {
    return reply.view('login', {
      mail: address,
      message: e.message
    });
  }
}

export function confirm(request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/');
  }
  let _validUser = null;
  try {
    model.validUser.findById(request.params.id)
    .then(validUser => {
      if (!validUser) {
        return model.sequelize.Promise.reject(Boom.notFound('Invalid parameter'));
      }
      _validUser = validUser;
      if (moment().subtract(15, 'minutes').isAfter(validUser.createdAt)) {
        return model.sequelize.Promise.reject(Boom.resourceGone('Link expired'));
      }
      return model.user.create({
        mail: validUser.mail,
        password_hash: validUser.password_hash,
        solt: validUser.solt
      });
    }).then(user => {
      if (!user) {
        return model.sequelize.Promise.reject(Boom.badImplementation('Register error'));
      }
      _validUser.destroy();
      request.cookieAuth.set({
        id: user.id,
        mail: user.mail
      });
      return reply.redirect('/');
    });
  } catch (e) {
    reply(e);
  }
}

export function logout(request, reply) {
  request.cookieAuth.clear();
  return reply.redirect('/');
}


