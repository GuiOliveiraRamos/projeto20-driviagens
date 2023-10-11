export function badRequest() {
    return {
        type: "bad_request",
        message: 'Smaller date não pode ser maior que bigger date.',
    };
}