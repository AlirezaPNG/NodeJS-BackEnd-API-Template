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
            }).withMessage('فرمت ایمیل مجاز نمی باشد فرمت ایمیل باید @gmail.com باشد'),
            Check('password').custom(text => {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (regex.test(text)) {
                    return true;
                } else {
                    return false;
                }
            }).withMessage("رمز عبور بایدحداقل 8 رقم ، شامل کارکترهای انگلیسی کوچک و بزرگ ، اعداد و کارکتر خاص باشد باشد"),
            Check('name').notEmpty().isLength({ min: 5 }).withMessage("نام نمیتواند کوتاه"),

            Check('phone').custom(text => {
                if (text.length == 11) {
                    return true
                } else {
                    return false
                }
            }).withMessage("شماره تلفن باید  11 رقمی باشد")

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
            }).withMessage('فرمت ایمیل مجاز نمی باشد فرمت ایمیل باید @gmail.com باشد'),

            Check('password').notEmpty().withMessage("password is empty")
        ]

    }
}


