import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import {createProxyMiddleware} from 'http-proxy-middleware';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const server = polka();

server.use(createProxyMiddleware('/stldevs-api', {
	changeOrigin: true,
	logLevel: 'debug',
	target: dev ? 'https://stldevs.com' : 'http://127.0.0.1:8080'
}));

server.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware({
		session: (req, res) => ({
			user: req.user
		})
	})
);

server.listen(PORT, err => {
	if (err) console.log('error', err);
});
