import { Semester } from "./gqlTypes";

// eslint-disable-next-line no-unused-vars
const groupBy = <T, K extends keyof T>(array: T[], key: K) => {
    let map = new Map<T[K], T[]>();
    array.forEach((item) => {
        let itemKey = item[key];
        if (!map.has(itemKey)) {
            map.set(
                itemKey,
                array.filter((i) => i[key] === item[key])
            );
        }
    });
    return map;
};

const getSemestersAsCascaderOptions = (array: Semester[]) => {
    const grouppedSemesters = groupBy(array, "year");
    let options: any[] = [];
    grouppedSemesters.forEach((year) => {
        let terms: any[] = [];
        year.forEach((term) => {
            terms.push({ value: term.id, label: term.term });
        });
        options.push({
            value: year[0].year,
            label: year[0].year,
            children: terms,
        });
    });
    return options;
};

export type { Semester };
export { getSemestersAsCascaderOptions };
