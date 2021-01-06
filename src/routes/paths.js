const paths = {
  home: '/',
  login: '/login',
  SaveCost: '/create-cost',
  costList: '/cost-list',
  newsList: '/news',
};

export default paths;

export function formatPath(path, params = {}) {
  Object.keys(params).forEach((key) => {
    path = path.replace(`:${key}`, params[key]);
  });

  return path;
}
