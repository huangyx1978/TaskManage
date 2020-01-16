import * as React from 'react';

/*在这里定义基础信息引用的全局输出格式,定义好后再appConfig.ts中声明输出*/
export const tvs = {
    //appname
    "jksoft/TaskManage": {
        //TUID的名称
        "Company": (values:any) => {
            let {no, name} = values;
            return <span>{name} <small className="text-muted">{no}</small>  hyx </span>
        }
    }
}
