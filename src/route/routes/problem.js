import * as model from '../../model';

export function userList(request, reply) {
  const userId = request.auth.credentials.id;
  model.problem.find({where: {user_id: userId}})
  .then(problems => {
    console.log('list', problems);
  });
  reply({
    test: "ok"
  });
}

export function create(request, reply) {
  const userId = request.auth.credentials.id;
  // model.problem.create({
    // user_id: userId,
    // body: ''
  // });
  console.log('payload', request.payload);
  reply({ha: "ha?"});
}

