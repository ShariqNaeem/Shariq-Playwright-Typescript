import { test, expect, request } from '@playwright/test'
import apiData from '../../test-data/api-data.json'
import { getRandomString } from '../../utils/randomString'
import { callPostRequest } from '../../utils/postRequest'

test.describe.configure({ mode: 'serial' })

const username = getRandomString()
const password = apiData.login.password
const isbn = '9781593277574';
let userId: string
let accessToken: string
let credentialsBase64: string

test('Creation of user account', async ({ baseURL }) => {
    const userEndPoint = '/Account/v1/user'
    const requestCall = await request.newContext()

    // MAKING THE BASIC AUTH TOKEN
    const btoa = (str: string) => Buffer.from(str).toString('base64');
    credentialsBase64 = btoa(`${username}:${password}`);
    let body = {
        userName: username,
        password: password
    }

    // CREATING THE USER
    const userResponse = await callPostRequest(requestCall, `${baseURL}${userEndPoint}`, body)
    expect(userResponse.status()).toBe(201)
    const content = await userResponse.json()
    userId = content['userID']
    console.log(userId)

})

test('Add a list of books', async ({ baseURL }) => {
    const addBooksEndPoint = '/BookStore/v1/Books'
    const requestCall = await request.newContext()
    let body = {
        userId: userId,
        collectionOfIsbns: [
            {
                isbn: isbn
            }
        ]
    }
    const authHeader = { 'Authorization': `Basic ${credentialsBase64}` };

    const response = await callPostRequest(requestCall, `${baseURL}${addBooksEndPoint}`, body, authHeader)
    const content = await response.json()
    expect(response.status()).toBe(201)
    expect
    console.log(content)

})