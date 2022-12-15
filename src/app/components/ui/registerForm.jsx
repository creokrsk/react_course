import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        licence: false,
    });
    // const { signUp } = useAuth();

    const qualities = useSelector(getQualities());
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id,
    }));

    const professions = useSelector(getProfessions());
    // console.log(professions);
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id,
    }));
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevstate) => ({
            ...prevstate,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        // const { profession, qualities } = data;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value),
        };

        dispatch(signUp(newData));
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения",
            },
            isEmail: {
                message: "Email введён некорректно",
            },
        },

        name: {
            isRequired: {
                message: "Имя обязательно для заполнения",
            },
            min: {
                message: "Имя должно содержать минимум 2 символа",
                value: 2,
            },
        },

        password: {
            isRequired: { message: "Поле пароль обязательно для заполнения" },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы 1 заглавную букву",
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру",
            },
            min: {
                message: "В пароле должно быть минимум 8 символов",
                value: 8,
            },
        },

        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию",
            },
        },
        licence: {
            isRequired: {
                message:
                    "Необходимо подтвердить лицензионное соглашение для использования нашего сервиса",
            },
        },
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
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
                lable="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                lable="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                onChange={handleChange}
                options={professionsList}
                name="profession"
                defaultOption="Choose"
                error={errors.profession}
                value={data.profession}
                label="Выбери свою профессию"
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" },
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <MultiSelectField
                options={qualitiesList}
                onChange={handleChange}
                dafaultValue={data.qualities}
                name="qualities"
                label="Выберите ваши качества"
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
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

export default RegisterForm;
