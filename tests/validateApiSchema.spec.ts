import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

const ajv = new Ajv();

test('Validate user API schema', async ({ request }) => {
    // 1. Get the real API response
    const response = await request.get('https://reqres.in/api/users/2',{
        headers: {
            "x-api-key": "free_user_3HAyFTI3odjO7NzIHA7OPlqnLhH"
        }   
    });
    const responseBody = await response.json();

    // 2. Define the expected structure (Schema)
    const userSchema = {
        type: 'object',
        properties: {
            data: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    email: { type: 'number' },
                    first_name: { type: 'number' }
                },
                required: ['data.id', 'data.email'] // These fields MUST exist
            }
        }
    };

    // 3. Validate
    const validate = ajv.compile(userSchema);
    const valid = validate(responseBody);

    // If it's not valid, print the errors
    if (!valid) {
        console.log(validate.errors);
    }

// If validation fails, we pass the AJV errors into our expect assertion
expect(
    valid, 
    `Schema validation failed! Errors: ${JSON.stringify(validate.errors, null, 2)}`
).toBe(true);
});