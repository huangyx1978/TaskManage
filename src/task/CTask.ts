import { CUqBase } from "tonvaApp";
import _ from 'lodash';
import { QueryPager, Query } from "tonva";
import { TuidSaveResult } from "tonva/dist/uq/tuid/tuid";
import { promises } from "dns";
import { createNo } from "tool/tools";
import {VTask} from "task/VTask"

export class CTask extends CUqBase{
    pager: QueryPager<any>;//定义全局的支持分页查询的操作对象,在此定义的全局对象,在后面的View里都能通过this.controller来调用
    /*必需的定义*/
    protected async internalStart(){
        this.pager=new QueryPager(this.uqs.taskmanage.QueryTask,10,30);
        this.pager.setItemDeepObservable();
        await this.pager.first({key:''});
    }
    
    tab = () =>this.renderView(VTask);//必需的定义

}