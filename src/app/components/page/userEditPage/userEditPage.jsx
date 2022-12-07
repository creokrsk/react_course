import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus,
} from "../../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus,
} from "../../../store/professions";

const UserEditPage = () => {
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { currentUser, updateUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(currentUser);
    const qualities = useSelector(getQualities());
    // console.log(qualities);
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const getQualitiesListByIds = (qualitiesIds) => {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    };

    const transformData = (data) => {
        return getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id,
        }));
    };

    const professionsList = professions.map((prof) => ({
        label: prof.name,
        value: prof._id,
    }));

    const qualitiesList = qualities.map((qual) => ({
        label: qual.name,
        value: qual._id,
    }));

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

        await updateUser({
            ...user,
            qualities: user.qualities.map((q) => q.value),
        });
        history.push(`/users/${currentUser._id}`);
    };

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser && user) {
            setUser({
                ...currentUser,
                qualities: transformData(currentUser.qualities),
            });
        }
    }, [professionsLoading, qualitiesLoading, currentUser, user]);

    useEffect(() => {
        if (user && isLoading) {
            setIsLoading(false);
        }
    }, [user]);

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
                                options={professionsList}
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
                                options={qualitiesList}
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
