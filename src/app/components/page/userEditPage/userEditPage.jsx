import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import { useParams, useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserEditPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: [],
    });

    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then(({ profession, qualities, ...users }) =>
            setUser((prevState) => ({
                ...prevState,
                ...users,
                qualities: transformData(qualities),
                // qualities: qualities.map((el) => ({
                //     label: el.name,
                //     value: el._id,
                //     // color: el.color,
                // })),
                profession: profession._id,
            }))
        );
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id,
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color,
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };

    // useEffect(() => {
    //     console.log(qualities);
    // }, [qualities]);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color,
                    });
                }
            }
        }
        return qualitiesArray;
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(user.qualities);
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = user;
        console.log({
            ...user,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities),
        });
        api.users
            .update(userId, {
                ...user,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities),
            })
            .then((data) => history.push(`/users/${data._id}`));
    };
    useEffect(() => {
        validate();
    }, [user]);
    useEffect(() => {
        if (user._id) {
            setIsLoading(false);
        }
    }, [user]);

    return (
        <div className="container mt-5">
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
                                options={professions}
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
                                options={qualities}
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
