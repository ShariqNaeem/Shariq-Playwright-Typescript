export async function callPostRequest(requestCall: any, url: string, requestBody: object, headers: Record<string, string> = {}) {
    const response = await requestCall.post(url, {
        data: requestBody,
        headers: headers
    });
    return response;
}