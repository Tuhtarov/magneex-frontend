export class BirthDay {
    date = null;

    constructor(date) {
        this.date = new Date(date);
    }

    getFullDate() {
        let fullDate = ''
        try {
            fullDate = this.date.toLocaleDateString('ru');
        } catch (e) {
            console.dir(e)
        }
        return fullDate;
    }
}

export default new BirthDay;