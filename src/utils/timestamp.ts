//we come up with the current timestamp
const getCurrentTimeStamp = () => {
    let year = new Date().getFullYear();

    let _month = new Date().getMonth();
    let month = _month < 10 ? `0${_month}` : _month;

    let _day = new Date().getDay();
    let day = _day < 10 ? `0${_day}` : _day;

    let _hour = new Date().getHours();
    let hour = _hour < 10 ? `0${_hour}` : _hour;

    let _minute = new Date().getMinutes();
    let minute = _minute < 10 ? `0${_minute}` : _minute;

    let _second = new Date().getSeconds();
    let second = _second < 10 ? `0${_second}` : _second;

    return `${year}${month}${day}${hour}${minute}${second}`;

};

export default getCurrentTimeStamp;