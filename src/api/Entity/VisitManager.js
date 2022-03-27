import axiosInstance from "@/api/Axios"
import {getHoursFromDatePeriod} from "@/features/HoursManager";

export function checkOverwork(visit) {
    const validate = (start, end) => start !== null && end !== null;
    const toDt = (str, notFull = false) => notFull ? new Date(`1970-01-01 ${str}`) : new Date(str);

    let
        result = {
            overwork: null
        },
        workBegin = visit.beginWorkTimeFull,
        workEnd = visit.endWorkTimeFull,
        jobBegin = visit.employee.jobPosition.beginWorkTime,
        jobEnd = visit.employee.jobPosition.endWorkTime;

    let datesNotNull = validate(jobBegin, jobEnd) && validate(workBegin, workEnd);

    if (datesNotNull) {
        const jobSeconds = (toDt(jobEnd, true) - toDt(jobBegin, true)) / 1000
        const workSessionSeconds = (toDt(workEnd) - toDt(workBegin)) / 1000

        if (workSessionSeconds > jobSeconds) {
            let minutes = (workSessionSeconds - jobSeconds) / 60;
            result.overwork = getOverworkStringByMinutes(minutes)
        }
    }

    return result
}

export function getWorkSessionInHours(visit) {
    const begin = new Date(visit.beginWorkTimeFull)
    const end = new Date(visit.endWorkTimeFull)

    return getHoursFromDatePeriod(begin, end)
}

export function getOverworkStringByMinutes(minutes) {
    return minutes > 60
        ? `${Math.round(minutes / 60)} час`
        : `${minutes} минут`;
}

class VisitManager {
    async getTodayByCurrentEmployee() {
        return await axiosInstance.get('/visits/today-history')
            .then(res => res.data.visit);
    }

    async getTodayByEmployeeId(id) {
        return await axiosInstance.get(`/visits/today-history/${id}`)
            .then(res => res.data.visit);
    }

    async getAllByCurrentEmployee() {
        return await axiosInstance.get('/visits/my-all-history')
            .then(res => res.data.visits);
    }

    async getAllByEmployeeId(id) {
        return await axiosInstance.get(`/visits/${id}`)
            .then(res => res.data.visits);
    }

    async getAllHistory() {
        return await axiosInstance.get(`/visits/`)
            .then(res => res.data.visits);
    }

    // для отчётов
    async findTardiesByEmployeeId(id) {
        return await axiosInstance.get(`/visits/tardies/${id}`)
            .then(res => res.data.tardies);
    }
}

export default new VisitManager();