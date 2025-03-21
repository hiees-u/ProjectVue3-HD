import { helpers } from "@vuelidate/validators";

export interface Product {
    id: number;
    title: string;
    price: number;
}

export interface Login {
    uName: string;
    uPass: string;
    role?: boolean | null;
}

export function Login(login?: Login): Login {
    console.log(login?.role);

    return {
        uName: login ? login.uName : '',
        uPass: login ? login.uPass : '',
        role: login ? login.role : null
    }
}

export function createDefaultProduct(): Product {
    return {
        id: 0,
        title: '',
        price: 0,
    };
}

export const minTitleLength = helpers.withMessage(
    "Title must be at least 3 characters long",
    (value: unknown) => typeof value === "string" && value.length >= 3
);

export const positivePrice = helpers.withMessage(
    "Price must be greater than 0",
    (value: unknown) => typeof value === "number" && value > 0
);