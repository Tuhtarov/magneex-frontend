import responseCode from "@/api/ResponseCode";

export default function getErrorMessage(statusCode) {
    let errorMessage;

    switch (statusCode) {
        case responseCode.HTTP_NOT_FOUND:
            errorMessage = 'QR код не действительный.'; break;
        case responseCode.HTTP_CONFLICT:
            errorMessage = 'Ваш рабочий день уже считается завершенным.'; break;
        default:
            errorMessage = 'При сканировании QR кода произошла не предвиденная ошибка.'
    }

    return errorMessage;
}