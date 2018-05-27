import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = '' //TODO insert API Root

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody)
};

const Tokens = {
  getTokens: () =>
    requests.get(/* End point */)
}

export default {
  Tokens
};
