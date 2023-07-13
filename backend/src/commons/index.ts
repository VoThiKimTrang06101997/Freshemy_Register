import { ValidationError, ValidationErrorItem } from "joi";

export const convertJoiErrorToString = (error: ValidationError): string => {
    return error.details.map((item: ValidationErrorItem) => item.message).join(", ");
};