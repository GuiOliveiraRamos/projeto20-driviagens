export function invalidFlightDate() {
    return {
        type: "invalid_date",
        message: "A data do voo deve ser maior do que a data atual",
    };
}