export const durationData = [
    { "name": "5 min", "value": (5 * 60).toString() },
    { "name": "10 min", "value": (10 * 60).toString() },
    { "name": "15 min", "value": (15 * 60).toString() },
    { "name": "20 min", "value": (20 * 60).toString() },
    { "name": "25 min", "value": (25 * 60).toString() },
    { "name": "30 min", "value": (30 * 60).toString() },
    { "name": "35 min", "value": (35 * 60).toString() },
    { "name": "40 min", "value": (40 * 60).toString() },
    { "name": "45 min", "value": (45 * 60).toString() },
    { "name": "50 min", "value": (50 * 60).toString() },
    { "name": "55 min", "value": (55 * 60).toString() },
    { "name": "60 min", "value": (60 * 60).toString() },
    { "name": "1 hr 5 min", "value": (65 * 60).toString() },
    { "name": "1 hr 10 min", "value": (70 * 60).toString() },
    { "name": "1 hr 15 min", "value": (75 * 60).toString() },
    { "name": "1 hr 20 min", "value": (80 * 60).toString() },
    { "name": "1 hr 25 min", "value": (85 * 60).toString() },
    { "name": "1 hr 30 min", "value": (90 * 60).toString() },
    { "name": "1 hr 35 min", "value": (95 * 60).toString() },
    { "name": "1 hr 40 min", "value": (100 * 60).toString() },
    { "name": "1 hr 45 min", "value": (105 * 60).toString() },
    { "name": "1 hr 50 min", "value": (110 * 60).toString() },
    { "name": "1 hr 55 min", "value": (115 * 60).toString() },
    { "name": "2 hr", "value": (120 * 60).toString() },
    { "name": "2 hr 15 min", "value": (135 * 60).toString() },
    { "name": "2 hr 30 min", "value": (150 * 60).toString() },
    { "name": "2 hr 45 min", "value": (165 * 60).toString() },
    { "name": "3 hr", "value": (180 * 60).toString() },
    { "name": "3 hr 15 min", "value": (195 * 60).toString() },
    { "name": "3 hr 30 min", "value": (210 * 60).toString() },
    { "name": "3 hr 45 min", "value": (225 * 60).toString() },
    { "name": "4 hr", "value": (240 * 60).toString() },
    { "name": "4 hr 30 min", "value": (270 * 60).toString() },
    { "name": "5 hr", "value": (300 * 60).toString() },
    { "name": "5 hr 30 min", "value": (330 * 60).toString() },
    { "name": "6 hr", "value": (360 * 60).toString() },
    { "name": "6 hr 30 min", "value": (390 * 60).toString() },
    { "name": "7 hr", "value": (420 * 60).toString() },
    { "name": "8 hr", "value": (480 * 60).toString() },
    { "name": "9 hr", "value": (540 * 60).toString() },
    { "name": "10 hr", "value": (600 * 60).toString() },
    { "name": "11 hr", "value": (660 * 60).toString() },
    { "name": "12 hr", "value": (720 * 60).toString() }
];

export const generateTimeArray = () => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Set to start of the day
    const timeArray = [];
    const interval = 5 * 60 * 1000; // 5 minutes in milliseconds

    for (let i = 0; i <= 24 * 60 * 60 * 1000; i += interval) {
        const currentTime = new Date(startOfDay.getTime() + i);
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');

        timeArray.push({
            name: `${hours}:${minutes}`,
            value: (currentTime.getTime() - startOfDay.getTime()) / 1000
        });
    }

    return timeArray;
};



