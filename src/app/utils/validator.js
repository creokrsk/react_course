export function validator(data, config) {
    const errors = {};

    function validate(validateMethod, data, config) {
        let statusValidate;

        switch (validateMethod) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusValidate = !data;
                } else {
                    statusValidate = data.trim() === "";
                }
                break;
            }
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g; // проверка емейла
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;

                break;
            }
            case "isFirstCapital": {
                const firstCapitalRegExp = /^([A-Z]+|[А-ЯЁ]+)/g;
                statusValidate = !firstCapitalRegExp.test(data);
                break;
            }
            case "isonlyLetter": {
                const onlyLetterRegExp = /^[A-Za-z\s]|[А-ЯЁа-яё\s]$/g;
                statusValidate = !onlyLetterRegExp.test(data);
                break;
            }
            default:
                break;
        }
        if (statusValidate) {
            return config.message;
        }
    }

    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }

    return errors;
}
