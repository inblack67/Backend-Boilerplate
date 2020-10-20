import { mutationType, stringArg } from '@nexus/schema';
import asyncHandler from '../middlewares/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import { User } from './User';
import UserModel from '../models/User';

export const Mutation = mutationType({
	definition(t) {
		t.typeName = 'Query';
		t.field('login', {
			type: User,
			description: 'Login',
			args: {
				email: stringArg(),
				password: stringArg(),
			},
			resolve: asyncHandler(async (parent, { email, password }, { session }) => {
				if (session.user) {
					throw new ErrorResponse('Not Authorized', 401);
				}

				const user = await UserModel.findOne({ email }).select('+password');

				if (!user) {
					throw new ErrorResponse('Invalid Credentials', 403);
				}

				const isMatch = await user.matchPassword(password);

				if (!isMatch) {
					throw new ErrorResponse('Invalid Credentials', 403);
				}

				session.user = user._id;

				return { name: user.name, email: user.email, createdAt: user.createdAt, _id: user._id };
			}),
		});

		t.field('logout', {
			type: 'String',
			description: 'Logout',
			nullable: true,
			resolve: asyncHandler(async (parent, args, { session }) => {
				if (!session.user) {
					throw new ErrorResponse('Not Authorized', 401);
				}

				new Promise((resolve) => {
					session.destroy((err) => {
						if (err) {
							console.error(err);
						}
						resolve(true);
					});
				});

				return 'Logout Successful';
			}),
		});

		t.field('register', {
			type: User,
			description: 'Register',
			args: {
				name: stringArg(),
				email: stringArg(),
				password: stringArg(),
				image: stringArg(),
			},
			resolve: asyncHandler(async (parent, { name, email, password, image }, { session }) => {
				if (session.user) {
					throw new ErrorResponse('Not Authorized', 401);
				}

				const user = await UserModel.create({ name, email, password, image });

				session.user = user._id;

				return {
					name: user.name,
					email: user.email,
					createdAt: user.createdAt,
					_id: user._id,
					image: user.image,
				};
			}),
		});
	},
});
