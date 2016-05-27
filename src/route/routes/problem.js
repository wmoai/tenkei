import * as model from '../../model';

export function userList(request, reply) {
  const userId = request.auth.credentials.id;
  model.problem.findAll({
    where: {
      user_id: userId
    },
    order: 'id DESC'
  }).then(problems => {
    reply(problems);
  });
}

export function get(request, reply) {
  model.problem.find({
    where: {
      id: request.params.id
    }
  }).then(problem => {
    reply(problem);
  });
}

export function create(request, reply) {
  const userId = request.auth.credentials.id;
  model.problem.create({
    user_id: userId,
    body: request.payload.body
  }).then(problem => {
    reply(problem);
  });
}

export function editMemo(request, reply) {
  const userId = request.auth.credentials.id;
  model.problem.find({
    where: {
      id: request.params.id
    }
  }).then(problem => {
    if (problem.user_id != userId) {
      return model.sequelize.Promise.reject(Boom.forbidden('Invalid user.'));
    }
    problem.update({memo: request.payload.memo}).then(problem => {
      reply(problem);
    });
  });

}
