// TODO add fetch polyfill just in case

// overkill?
function baseUrl(strings: TemplateStringsArray, ...values: Array<number>) {
    return `http://localhost:8080${strings[0]}${values[0]}`;
}

export const RestHelper = {
    getLiftData: () => fetch(baseUrl`/building`),
    getLiftStatus: () => fetch(baseUrl`/elevators`),
    callLift: (floorNumber: number) => fetch(baseUrl`/floor/${floorNumber}`),
}