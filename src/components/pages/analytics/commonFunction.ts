export const getOnlyMonth = (date: string) => {
    const edit = date.split('-', 2)[1].slice(0, 3).toLowerCase();
    return edit;
}
export const getOnlyDay = (date: string) => {
    const edit = date.split('-', 3)[2];
    const pureZeroEdit = parseInt(edit);
    return pureZeroEdit;
}




export const monthDataFormat = (fetchData: { income: string, totalPosts: string; month: string }[], dataContainer: string[]) => {
    console.log(fetchData)
    const sampleData: number[] = [];
    dataContainer.map((mon) => {

        const result = fetchData.find((data) => getOnlyMonth(data.month) == mon)
        if (result) {
            if (result.income) {
                sampleData.push(Number(result.income));
            }
            if (result.totalPosts) {

                sampleData.push(Number(result.totalPosts));
            }
        } else {
            sampleData.push(0);
        }
    })

    return sampleData;
}




export const dailyDataFormat = (fetchData: { income: string, totalPosts: string, day: string }[], dataContainer: string[]) => {
    const sampleData: number[] = [];
    dataContainer.map((day) => {
        const result = fetchData.find((data) => getOnlyDay(data.day) == Number(day))
        if (result) {
            if (result.income) {
                sampleData.push(Number(result.income));
            }
            if (result.totalPosts) {
                sampleData.push(Number(result.totalPosts));
            }
        } else {
            sampleData.push(0);
        }
    })
    return sampleData;
}
