/**
 * Utility function to remove objects if they have a duplicate property as another object in a provided list.
 *
 * Solution borrowed from https://dev.to/matthewoates/comment/8hdm.
 */
export function dedupeArrayByProperty(list: any[], key: string) {
    const seen = new Set();
    const filteredArr = list.filter(el => {
        // If the value is undefined, skip over it
        if (el[key] === undefined) {
            return;
        }
        const duplicate = seen.has(el[key]);
        seen.add(el[key]);
        return !duplicate;
    });
    return filteredArr;
}
