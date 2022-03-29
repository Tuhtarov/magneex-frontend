export function getHoursIntervalFromDatePeriod(begin, end) {
    begin = new Date(begin)
    end = new Date(end)

    const MILLISECOND = 1000;
    const seconds = (end - begin) / MILLISECOND;

    return Math.round(seconds / 60 / 60);
}

export function getJobHours(jobPosition) {
    return getHoursIntervalFromDatePeriod(jobPosition.beginWork, jobPosition.endWork)
}