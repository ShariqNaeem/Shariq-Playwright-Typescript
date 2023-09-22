import { test, expect, request } from '@playwright/test'
import apiData from '../../test-data/api-data.json'
import { getRandomString } from '../../utils/randomString'
import { callPostRequest } from '../../utils/postRequest'
import { callDeleteRequest } from '../../utils/deleteRequest'

test.describe.configure({ mode: 'serial' })
const userEndPoint = '/Account/v1/user'
const addBooksEndPoint = '/BookStore/v1/Books'
const deleteBookEndPoint = '/BookStore/v1/Book'

const username = getRandomString()
const password = apiData.login.password
const isbn = '9781593277574';
let userId: string

// MAKING THE BASIC AUTH TOKEN
const btoa = (str: string) => Buffer.from(str).toString('base64');
const credentialsBase64 = btoa(`${username}:${password}`);
const authHeader = { 'Authorization': `Basic ${credentialsBase64}` };

test('1. Creation of user account @api', async ({ baseURL }) => {
    const requestCall = await request.newContext()
    let body = {
        userName: username,
        password: password
    }
    const userResponse = await callPostRequest(requestCall, `${baseURL}${userEndPoint}`, body)
    const content = await userResponse.json()

    userId = content['userID']

    expect(userResponse.status()).toBe(201)
    expect(content).toHaveProperty('userID')
    expect(typeof content.userID).toBe('string')
    expect(content).toHaveProperty('username')
    expect(typeof content.username).toBe('string')
    expect(content.username).toEqual(username)
    expect(content).toHaveProperty('books')
    expect(Array.isArray(content.books)).toBe(true);
})

test('2. Try to create another user with same credentials @api', async ({ baseURL }) => {
    const requestCall = await request.newContext()
    let body = {
        userName: username,
        password: password
    }

    const userResponse = await callPostRequest(requestCall, `${baseURL}${userEndPoint}`, body)
    const content = await userResponse.json()

    expect(userResponse.status()).toBe(406)
    expect(content).toEqual({
        code: '1204',
        message: 'User exists!'
    });
})

test('3. Add a list of books @api', async ({ baseURL }) => {
    const requestCall = await request.newContext()
    let body = {
        userId: userId,
        collectionOfIsbns: [
            {
                isbn: isbn
            }
        ]
    }
    const response = await callPostRequest(requestCall, `${baseURL}${addBooksEndPoint}`, body, authHeader)
    const content = await response.json()
    expect(response.status()).toBe(201)
    expect(content).toHaveProperty('books')
    expect(Array.isArray(content.books)).toBe(true)
    expect(content.books[0]).toHaveProperty('isbn')
    expect(content.books[0].isbn).toEqual(isbn)
})

test('4. Adding the same book for the same user @api', async ({ baseURL }) => {
    const requestCall = await request.newContext()
    let body = {
        userId: userId,
        collectionOfIsbns: [
            {
                isbn: isbn
            }
        ]
    }
    const response = await callPostRequest(requestCall, `${baseURL}${addBooksEndPoint}`, body, authHeader)
    const content = await response.json()
    expect(content).toEqual({
        code: "1210",
        message: "ISBN already present in the User's Collection!"
    });
})

test('5. Remove one of the added books @api', async ({ baseURL }) => {
    const requestCall = await request.newContext()
    let body = {
        userId: userId,
        isbn: isbn
    }
    const response = await callDeleteRequest(requestCall, `${baseURL}${deleteBookEndPoint}`, body, authHeader)
    expect(response.status()).toBe(204)
})

test('6. Try to remove book without basic auth token @api', async ({ baseURL }) => {
    const requestCall = await request.newContext()
    let body = {
        userId: userId,
        isbn: isbn
    }
    const response = await callDeleteRequest(requestCall, `${baseURL}${deleteBookEndPoint}`, body)
    const content = await response.json()
    expect(content).toEqual({
        code: "1200",
        message: "User not authorized!"
    });
})