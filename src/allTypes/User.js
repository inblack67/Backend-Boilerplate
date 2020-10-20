import { objectType } from '@nexus/schema';

export const User = objectType({
	name: 'User',
	definition(t) {
		t.string('name');
		t.string('email');
		t.string('image');
		t.string('password', { nullable: true });
		t.id('_id');
		t.date('createdAt');
	},
});
