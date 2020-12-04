import { env } from '../../env';
import { getReverseProxyDial } from '../utils/get-reverse-proxy-dial';

export const fallback = {
  group: 'fallback',
  match: [{
    host: [
      env.MELI_SITES_HOST,
      `*.${env.MELI_SITES_HOST}`,
    ],
  }],
  handle: [
    {
      handler: 'rewrite',
      uri: '/static/404.html',
    },
    // https://caddyserver.com/docs/json/apps/http/servers/routes/handle/reverse_proxy/
    {
      handler: 'reverse_proxy',
      upstreams: [{
        dial: getReverseProxyDial(env.MELI_HOST_INTERNAL.toString()),
      }],
      handle_response: [{
        status_code: '404',
      }],
    },
    // {
    //   handler: 'static_response',
    //   body: 'The road ends here',
    // },
  ],
  terminal: true,
};
