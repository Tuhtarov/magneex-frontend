import responseCode from "@/api/ResponseCode";
import ErrorMessages from "@/api/ErrorMessages";

export default class VisitError {
    static getMessage(statusCode) {
        let errorMessage;

        switch (statusCode) {
            case responseCode.HTTP_NOT_FOUND:
                errorMessage = ErrorMessages.NOT_FOUND; break;
            case responseCode.HTTP_CONFLICT:
                errorMessage = 'При попытке получить информацию о посещении, произошёл конфликт на сервере.'; break;
            default:
                errorMessage = ErrorMessages.UNKNOWN_ERROR
        }

        return errorMessage;
    }
}