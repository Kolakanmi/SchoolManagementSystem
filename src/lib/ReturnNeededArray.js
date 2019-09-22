export function returnClassesArray(arr) {
    let edited = {};
    arr.forEach(v => {
        let a = v.classId;
        let capitalise = a.toUpperCase();
        if (!edited[capitalise]) {
            edited[capitalise] = true;
        }
    });

    return Object.keys(edited);
}

export function returnSubjectsArray(arr) {
    let edited = {};
    arr.forEach(v => {
        let a = v.title;
        let capitalise = a.charAt(0).toUpperCase() + a.substring(1).toLowerCase();
        if (!edited[capitalise]) {
            edited[capitalise] = true;
        }
    });

    return Object.keys(edited);
}

export function returnSectionArray(arr) {
    let edited = {};
    arr.forEach(v => {
        let a = v.section;
        let capitalise = a.toUpperCase();
        if (!edited[capitalise]) {
            edited[capitalise] = true;
        }
    });

    return Object.keys(edited);
}
