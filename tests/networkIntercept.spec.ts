import { test, expect} from '@playwright/test';

test('Network Interception Test', async ({ page }) => {
    // Intercepting a network request and modifying the response
    await page.route('https://reqres.in/api/users/2', async (route) => {
        const jsonResponse = {
            data:{
                id:2,
                name:"Chaitra",
                job:"SDET 3"
            }
        };  
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(jsonResponse),
        });
    });


    const responsePromise = page.waitForResponse('https://reqres.in/api/users/2');
     await page.goto('https://reqres.in/api/users/2');
    const response = await responsePromise;

    // Navigate to the page that triggers the network request
    // const response = await page.goto('https://reqres.in/api/users/2');

    // Wait for the network request to complete and verify the modified response
    const responseBody = await response.json();
    console.log("Modified Response:", responseBody);

    // Assertions to verify the modified response
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.name).toBe("Chaitra");
    expect(responseBody.data.job).toBe("SDET 3");       
    
  });

  test('Modify real API response using network interception', async ({ page }) => {
    // Intercepting a network request and modifying the response
    await page.route('https://reqres.in/api/users/2', async (route) => {    

    const response = await route.fetch();
    const originalResponseBody = await response.json();

    // Modify the response body
    const modifiedResponseBody = {
        ...originalResponseBody,
        data: {
            ...originalResponseBody.data,
            name: "Chaitra",
            job: "SDET 3"
        }
    };      

    await route.fulfill({
        status: response.status(),
        contentType: 'application/json',
        body: JSON.stringify(modifiedResponseBody),
    });
    });

    const responsePromise = page.waitForResponse('https://reqres.in/api/users/2');
     await page.goto('https://reqres.in/api/users/2');
    const response = await responsePromise;

    // Wait for the network request to complete and verify the modified response
    const responseBody = await response.json();
    console.log("Modified Response:", responseBody);

    // Assertions to verify the modified response
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.name).toBe("Chaitra");
    expect(responseBody.data.job).toBe("SDET 3");
  });
