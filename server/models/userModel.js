const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const RegistrationCentre = require('./registrationCentreModel')
const Schema = mongoose.Schema;

const UserSchema= new Schema({
    ssn: {
        type: String,
        required: [true, 'A user must have SSN'],
        validate: {
            validator: function (value) {
                // Phone number has 10 digits
                return (/^[0-9]{12}$/.test(value));
            },
            message: props => `${props.value} is not a valid ssn`
        },
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'A user must have date of birth']
    },
    name: {
        type: String,
        required: [true, 'A user must have name']
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, 'A user must have phone number'],
        validate: {
            validator: function (value) {
                // Phone number has 10 digits
                return (/^[0-9]{10}$/.test(value));
            },
            message: props => `${props.value} is not a valid phone number`
        },
        unique: true
    },
    email: {
        type: String,
        required: [true, 'A user must have email'],
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email address`
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    workFor: {
        type: Schema.Types.ObjectId,
        ref: 'RegistrationCentre',
        required: true
    },
    role: {
        type: String,
        enum: ['staff', 'admin'],
        default: 'staff'
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
});
UserSchema.pre('save', async function (next) {
    //only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    //hash the password with cost 12
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined;
    next();
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1500;
    next();
});
UserSchema.pre(/^find/, function (next) {
    this.find({active: {$ne: false}}).select('-__v');
    next();
});
UserSchema.pre(/^find/, function (next) {
    this.populate('workFor','-__v');
    next();
})
UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changesPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        console.log(this.passwordChangedAt);
        console.log(changedTimestamp, JWTTimestamp);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}
UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32)
        .toString('hex');

    this.passwordResetToken = crypto.createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    console.log({resetToken}, this.passwordResetToken);
    return resetToken;
}
const User = mongoose.model('User', UserSchema);
module.exports = User;