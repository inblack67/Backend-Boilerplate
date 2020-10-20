import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import 'colors';
import dotenv from 'dotenv';
import { schema } from './schema';
import errorHandler from './middlewares/errorHandler';
import { connectDB } from './connectDB';
import { __prod__ } from './utils/constants';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';

const main = async () => {
	const RedisClient = new Redis();
	const RedisStore = connectRedis(session);

	dotenv.config({ path: 'config.env' });

	connectDB();

	const app = express();

	app.use(express.json());
	app.use(
		session({
			store: new RedisStore({ client: RedisClient }),
			name: 'quid',
			secret: process.env.SESSION_SECRET,
			resave: false, // no revival
			saveUninitialized: false, // dont save until the cookie is generated
			cookie: {
				httpOnly: true,
				secure: __prod__,
				maxAge: 1000 * 60 * 60 * 24, // 1 day
			},
		}),
	);

	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }) => ({ req, res, session: req.session, redis: RedisClient }),
	});

	apolloServer.applyMiddleware({
		app,
		cors: {
			credentials: true,
			origin: process.env.CLIENT_URL
		},
	});

	app.get('/', (req, res) => {
		res.send('API up and runnin');
	});

	app.use(errorHandler);

	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`.green.bold);
	});
};

main().catch((err) => console.error(err));
