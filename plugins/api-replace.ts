import { Plugin } from 'vite';

export default function apiReplace(): Plugin {
  return {
    name: 'api-replace',
    transform(code, id) {
      if (id.includes('api')) {
        return code.replace(/\/api/g, 'https://dummyjson.com');
      }
    },
  };
}
