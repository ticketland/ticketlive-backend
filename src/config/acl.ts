export default {
  config: {
    baseUrl: '/',
    defaultRole: 'operator',
    decodedObjectName: 'user',
    filename: 'aclRules.json',
    path: 'src/config',
  },

  responseObject: {
    status: 'Access Denied',
    message: 'You are not authorized to access this resource',
  },
};
