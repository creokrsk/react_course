import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";

const UserEditPage = () => {
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { currentUser } = useAuth();
    const { updateUser } = useAuth();
    const [user, setUser] = useState(currentUser);
    const { professions } = useProfessions();
    const { qualities, isLoading } = useQualities();

    const transformData = (data) => {
        const findData = data.map((id) =>
            getQualities.find((q) => q.value === id)
        );
        return findData;
    };

    const getProfessions = professions.map((prof) => ({
        label: prof.name,
        value: prof._id,
    }));

    const getQualities = qualities.map((qual) => ({
        label: qual.name,
        value: qual._id,
    }));

    useEffect(() => {
        if (!isLoading) {
            setUser((prevstate) => ({
                ...prevstate,
                qualities: transformData(currentUser.qualities),
            }));
        }
    }, [isLoading]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения",
            },
            isEmail: {
                message: "Email введен не корректно",
            },
        },
        name: {
            isRequired: {
                message: "Имя обязательно к заполнению",
            },
            isFirstCapital: {
                message: "Имя должно начинаться с заглавной буквы",
            },
            isonlyLetter: {
                message:
                    "Имя и фамилия должны содержать только буквы и пробелы",
            },
        },
    };

    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setUser((prevstate) => ({
            ...prevstate,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user.qualities);
        const isValid = validate();
        if (!isValid) return;
        const newUser = {
            ...user,
            qualities: user.qualities.map((q) => q.value),
        };

        try {
            await updateUser(newUser);
            history.push("/users");
        } catch (error) {
            setErrors(error);
        }
    };
    useEffect(() => {
        validate();
    }, [user]);

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                lable="Name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                lable="Электронная почта"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                defaultOption="Choose..."
                                onChange={handleChange}
                                name="profession"
                                options={getProfessions}
                                error={errors.profession}
                                value={user.profession}
                                label="Выбери свою профессию"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" },
                                ]}
                                value={user.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={getQualities}
                                onChange={handleChange}
                                defaultValue={user.qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить данные
                            </button>
                        </form>
                    ) : (
                        <h1>loading...</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserEditPage;
