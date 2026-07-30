import {test, expect} from '@playwright/test';

test('API chaining test by creating a new user', async({request})=> {
const response= await request.post("https://reqres.in/api/users",{
    data:{
        
        "name" :"Chaitra",
        "job": "SDET 3"
    },
    headers:{
     "x-api-key": "free_user_3HAyFTI3odjO7NzIHA7OPlqnLhH"}
});

expect(response.status()).toBe(201);
const responseBody=await response.json();
const userId= responseBody.id;
console.log("Generated User ID:", userId);


const getResponse = await request.get(`https://reqres.in/api/users/12`,{
    headers:{
        "x-api-key": "free_user_3HAyFTI3odjO7NzIHA7OPlqnLhH"
    }
})

expect(getResponse.status()).toBe(200);

const getresponseBody= await getResponse.json();
console.log("User Details:", getresponseBody.data);


});