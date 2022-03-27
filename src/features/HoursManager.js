export function getHoursFromDatePeriod(begin, end) {
    const MILLISECOND = 1000;

    const seconds = (end - begin) / MILLISECOND;

    return seconds / 60 / 60;
}