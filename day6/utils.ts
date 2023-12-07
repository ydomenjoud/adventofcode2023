
export type Race = {
    time: number;
    record: number;
}

export function getNumbersOfWaysToBeatTheRecord(race: Race) {

    const {record, time} = race;

    let numbersOfWayToBeatTheRecord = 0;
    for (let i = 1; i <= time; i++) {
        const distance = (time - i) * i;
        if (distance > record) {
            numbersOfWayToBeatTheRecord++;
        }
    }

    return numbersOfWayToBeatTheRecord;
}

