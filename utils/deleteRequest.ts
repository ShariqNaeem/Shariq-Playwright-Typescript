export async function callDeleteRequest(requestCall: any, url: string, requestBody: object, headers: Record<string, string> = {}) {
    const response = await requestCall.delete(url, {
        data: requestBody,
        headers: headers
    });
    return response;
}