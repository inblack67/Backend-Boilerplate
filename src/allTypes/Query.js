import { queryType } from '@nexus/schema';
import ErrorResponse from '../utils/errorResponse';
import { User } from './User';
import asyncHandler from '../middlewares/asyncHandler';
import UserModel from '../models/User';

export const Query = queryType({
	definition(t) {
		t.typeName = 'Query';
		t.string('hello', {
			resolve: () => 'world',
		});
		t.field('getMe', {
			type: User,
			description: 'Get Logged In User',
			resolve: asyncHandler(async (parent, args, { session }) => {
				if (!session.user) {
					throw new ErrorResponse('Not Authenticated', 401);
				}
				const user = await UserModel.findById(session.user);
				if (!user) {
					throw new ErrorResponse('Invalid Credentials', 401);
				}
				return user;
			}),
		});
	},
});
