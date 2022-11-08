import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
// import { validator } from "../../utils/validator";
import * as yup from "yup";
import { useLogIn } from "../../hooks/useLogIn";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    // console.log(process.env);
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false,
    });

    const { signIn } = useLogIn();
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValid = validate();
        if (!isValid) {
            return 0;
        }
        // console.log(data);

        try {
            await signIn(data);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };

    const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required("Поле пароль обязательно для заполнения")
            .matches(
                /(?=.*[A-Z])/,
                "Пароль должен содержать хотя бы 1 заглавную букву"
            )
            .matches(
                /(?=.*[0-9])/,
                "Пароль должен содержать хотя бы одну цифру"
            )
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Пароль должен содержать один из специальных символов: !@#$%^&*"
            )
            .matches(/(?=.{8,})/, "В пароле должно быть минимум 8 символов"),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("Email введён некорректно"),
    });

    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: "Электронная почта обязательна для заполнения",
    //         },
    //         isEmail: {
    //             message: "Email введён некорректно",
    //         },
    //     },
    //     password: {
    //         isRequired: { message: "Поле пароль обязательно для заполнения" },
    //         isCapitalSymbol: {
    //             message: "Пароль должен содержать хотя бы 1 заглавную букву",
    //         },
    //         isContainDigit: {
    //             message: "Пароль должен содержать хотя бы одну цифру",
    //         },
    //         min: {
    //             message: "В пароле должно быть минимум 8 символов",
    //             value: 8,
    //         },
    //     },
    // };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        // const errors = validator(data, validatorConfig);
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        // setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                lable="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                lable="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                submit
            </button>
        </form>
    );
};

export default LoginForm;
