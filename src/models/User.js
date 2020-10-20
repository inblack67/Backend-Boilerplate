import { Schema, models, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: [ true, 'Name is required' ],
		},
		email: {
			type: String,
			required: [ true, 'Email is required' ],
			unique: [ true, 'Invalid Credentials' ],
			match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Add a valid email' ],
		},
		password: {
			type: String,
			required: [ true, 'Password is required' ],
			minlength: [ 8, 'Password must be 8 chars' ],
			maxlength: [ 16, 'Password cannot exceed 16 chars' ],
			select: false,
		},
		image: {
			type: String,
			trim: true,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

UserSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await genSalt(10);
	this.password = await hash(this.password, salt);

	next();
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
	return await compare(enteredPassword, this.password);
};

export default (models && models.User) || model('User', UserSchema);
