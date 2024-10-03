const expressValidator = require('express-validator');
const Check = expressValidator.check


module.exports = new class {
    regiserValid() {

        return [
            Check('email').custom(text => {
                const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
                console.log(regex.test(text));
                if (regex.test(text)) {
                    return true;
                } else {
                    return false;
                }
            }).withMessage('Email format is not allowed to be @gmail.com'),
            Check('password').custom(text => {
                const regex = /^[A-Za-z\d]{8,}$/
                if (regex.test(text)) {
                    return true;
                } else {
                    return false;
                }
            }).withMessage("Password must be 8 digits and you should be English and numbers"),
            Check('name').notEmpty().isLength({ min: 5 }).withMessage("Name can't be short"),

        ]
    }


    loginValid() {
        return [

            Check('email').custom(text => {
                const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
                console.log(regex.test(text));
                if (regex.test(text)) {
                    return true;
                } else {
                    return false;
                }
            }).withMessage('Email format is not allowed to be @gmail.com'),

            Check('password').notEmpty().withMessage("password is empty")
        ]

    }
}


