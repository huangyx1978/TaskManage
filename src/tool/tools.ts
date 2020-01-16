export function createNo({date, no}: {date:string, no:number}) {
        let d = new Date(date);
        let newNo = String(
            (
                (
                    ((d.getFullYear()%100)*100+(d.getMonth()+1))*100 + d.getDate()
                )*10000+no
            )
        );
        return newNo;
    }
    