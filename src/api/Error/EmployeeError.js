import responseCode from "@/api/ResponseCode";
import ErrorMessages from "@/api/ErrorMessages";

export default class EmployeeError {
    static getMessage(statusCode) {
        let errorMessage;

        switch (statusCode) {
            case responseCode.HTTP_NOT_FOUND:
                errorMessage = 'Сотрудник не найден.'; break;
            case responseCode.HTTP_CONFLICT:
                errorMessage = ErrorMessages.SERVER_CONFLICT; break;
            default:
                errorMessage = ErrorMessages.UNKNOWN_ERROR
        }

        return errorMessage;
    }
}