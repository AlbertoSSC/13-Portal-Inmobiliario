import { Validators, createFormValidation } from "@lemoncode/fonk";
import { arrayRequired } from "@lemoncode/fonk-array-required-validator";
import { isUrl } from '@lemoncode/fonk-is-url-validator';
import { isNumber } from '@lemoncode/fonk-is-number-validator';

const validationSchema = {
    field: {
        title: [Validators.required],
        notes: [Validators.required],
        email: [Validators.required,
        Validators.email],
        phone: [Validators.required,
        {
            validator: Validators.pattern,
            customArgs: { pattern: '^(6|7|8|9)\\d{8}$' },
        }
        ],
        price: [Validators.required,
        isNumber.validator],
        saleTypes: [arrayRequired.validator],
        address: [Validators.required],
        city: [Validators.required],
        province: [Validators.required],
        squareMeter: [Validators.required,
        isNumber.validator],
        rooms: [Validators.required,
        isNumber.validator],
        bathrooms: [Validators.required,
        isNumber.validator],
        locationUrl: [Validators.required,
        isUrl.validator],
        mainFeatures: [arrayRequired.validator]
    }
};

export const formValidation = createFormValidation(validationSchema);