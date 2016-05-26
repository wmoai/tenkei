import JWT from 'jsonwebtoken';
import moment from 'moment';

const secret = 'aPar5j9scttl59Q/wYUcJOBaWzim0Maf3Y2ONab2DFwY15M66TS/dAjTtqNaryi9CtiX8Xm6P0oWP3HLlfkplVNV2DAb8MeB1M+98pjAiGtU4myumqBJOIu8J5LuPv8F0FdBxMs3ofkCM2XuHfRnOxmepo/3z3mryfuAfC9Ajqo1jlSj555SXNbW4lNizl0+sDlAV5EyJR9Nh29EFfeR5oILYkCTuFzWb7tRZUzXgoIcLPGYMY5UcSTLcmxCZK8nm5nwK55bd1Ky2XAw0h8dlJZsiVbrQkx561p1AdXTkCBXTau/EvXfD/aSBFl4PaiaWSSCFkM3uz/v8rXJwKutOg==';

export const options = {
   key: secret,
   validateFunc: (decoded, request, callback) => {
     return callback(null, true);
   }, 
   verifyOptions: { algorithms: [ 'HS256' ] }
}

export function getToken(user) {
  const token = JWT.sign({
    id: user.id,
    created: moment().format('YYYY/MM/DD HH:mm:ss')
  }, secret);
  return token;
}

