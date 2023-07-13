import Joi, { ObjectSchema } from "joi";

type Registration = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    token: string;
};

export const registrationSchema: ObjectSchema<Registration> = Joi.object({
    email: Joi.string()
        .regex(/^\S+@\S+\.\S+$/)
        .required()
        .messages({
            "string.base": "Email must be a string",
            "any.required": "Email is required",
            "string.regex": "Incorrect email",
        }),

    password: Joi.string().required().messages({
        "string.base": "Password must be a string",
        "any.required": "Password is required",
    }),

    first_name: Joi.string().required().messages({
        "string.base": "First name must be a string",
        "any.required": "First name is required",
    }),

    last_name: Joi.string().required().messages({
        "string.base": "Last name must be a string",
        "any.required": "Last name is required",
    }),

    // confirmPassword: Joi.string().valid(Joi.ref("password")).required().strict(),

    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Passwords do not match",
        "any.required": "Confirm password is required",
    }),
});
