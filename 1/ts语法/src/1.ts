interface IPerson<T> {
    name: string,
    age: number,
    extraInfo: T,
}

type JobInfo = {
    title: string,
    company: string,
}

let p: IPerson<JobInfo> = {
    name: '123',
    age: 10,
    extraInfo: {
        title: '123',
        company: '123'
    },
}