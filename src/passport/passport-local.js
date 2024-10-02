const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcrypt');


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)

    if (user) {
        done(null, user)
    }
})


passport.use("local.login", new localStrategy(({
    usernameField: 'email',
    passwordField: 'password',
}), async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'user not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));


passport.use("local.register", new localStrategy(({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,

}), async (req, email, password, done) => {
    try {
        let user = await User.findOne({ phone: req.body.email });
        let a = await User.findOne({ email: req.body.email })

        if (user || a) {
            return done(null, false, { message: "این کاربر قبل ثبت نام کرده است" });
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        await newUser.save();
        done(null, newUser);
    } catch (error) {
        console.log(error);
        return done(error, false, { message: error })
    }
}))


