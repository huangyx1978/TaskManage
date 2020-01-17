import { CUqBase } from "tonvaApp";
import _ from 'lodash';
import { QueryPager, Query, BoxId } from "tonva";
import { TuidSaveResult } from "tonva/dist/uq/tuid/tuid";
import { promises } from "dns";
import { createNo } from "tool/tools";
import {VTask} from "task/VTask"
import { VAddTask } from "./VAddTask";
import { UQs } from "tonvaApp/uqs";
import { VCallCompany } from "./VCallCompany";
import { VCallDepartment } from "./VCallDepartment";
import { VCallstaff } from "./VCallstaff";
import { VAddTaskdetail } from "./VAddTaskdetail";
import { wait } from "@testing-library/react";
import { VTaskDetails } from "./VTaskDetails";
import { observable } from "mobx";

export interface taskdetail{
    fdate:Date,
    staffmember:BoxId,
    title:string,
    taskdesc:string,
    integral:number
}

export interface Task{
    id?:number,
    date?:Date,
    no:string,
    compnay:BoxId;
    department:BoxId,
    taskdetail:taskdetail[]
}

export class CTask extends CUqBase{
    pager: QueryPager<any>;//定义全局的支持分页查询的操作对象,在此定义的全局对象,在后面的View里都能通过this.controller来调用
    callpager:QueryPager<any>;
    @observable task: Task;
    /*必需的定义*/
    protected async internalStart(){
        this.pager=new QueryPager(this.uqs.taskmanage.QueryTask,10,30);
        this.pager.setItemDeepObservable();
        await this.pager.first({key:''});
    }
    
    tab = () =>this.renderView(VTask);//必需的定义

    showtaskdetail =(taskdetail:any)=>{
        this.openVPage(VTaskDetails,taskdetail);
    }

    private getemptytask=():Task=>{
        return {no:'',compnay:undefined,department:undefined,taskdetail:[]}
    }

    showaddtask = () =>{
        this.task=this.getemptytask();
        this.openVPage(VAddTask,this.task);
    }

    showaddtaskdetail =()=>{
        this.openVPage(VAddTaskdetail,this.task);
    }

    addtaskdetail =(taskdetail:taskdetail)=>{
        this.task.taskdetail.push(taskdetail);//将项追加到数组末尾,unshift先开头追加元素,splice删除指定索引的元素
    }

    savetask = async():Promise<any>=>{
        let {Task} =  this.uqs.taskmanage;
        let ret = await Task.save('初始提交',this.task);//date 单据日期,flow提交流水,id 单据id,no 单据编号,name 单据名称
        //await Task.getSheet(1);//获取单据
        //await Task.action(1, 1, '$', 'ccc');//第一个参数是单据id,第二个参数是flowid(提交记录流水,相当于老平台的stateflowid),第三个参数是当前状态,第四个参数是要调用的action的名字
        //await Task.getStateSheets('$', 0, 100);
        //await this.pager.first({key:''});
        return ret;
    }

    callcompany = async ():Promise<any> =>{
        this.callpager = new QueryPager(this.uqs.task.QueryCompany, 10, 30);//实例化分页查询操作对象
        this.callpager.setItemDeepObservable();//执行这个方法后可实现绑定了当前paper的View自动刷新显示
        await this.callpager.first({key:''});//执行第一次查询,前面需要加await,因为这是异步查询
        return this.vCall(VCallCompany);//openVPage可以传第二个参数,如果有传第二个参数,则对应view里面的open方法需要定义入参用于接收改参数,query的查询结果对应数组类型any[]
     }
     
     calldepartmen = async ():Promise<any> =>{
        this.callpager = new QueryPager(this.uqs.task.QueryDepartment, 10, 30);//实例化分页查询操作对象
        this.callpager.setItemDeepObservable();//执行这个方法后可实现绑定了当前paper的View自动刷新显示
        await this.callpager.first({key:''});//执行第一次查询,前面需要加await,因为这是异步查询
        return this.vCall(VCallDepartment);//openVPage可以传第二个参数,如果有传第二个参数,则对应view里面的open方法需要定义入参用于接收改参数,query的查询结果对应数组类型any[]
     }

     callstaff = async ():Promise<any> =>{
        this.callpager = new QueryPager(this.uqs.task.QueryStaffMember, 10, 30);//实例化分页查询操作对象
        this.callpager.setItemDeepObservable();//执行这个方法后可实现绑定了当前paper的View自动刷新显示
        await this.callpager.first({key:''});//执行第一次查询,前面需要加await,因为这是异步查询
        return this.vCall(VCallstaff);//openVPage可以传第二个参数,如果有传第二个参数,则对应view里面的open方法需要定义入参用于接收改参数,query的查询结果对应数组类型any[]
     }

    boxCompany(id:number) {

        return this.uqs.task.Company.boxId(id);//boxId是根据id获取基础信息,获取字段列表为TUID里定义为main的字段
    }

    boxDepartment(id:number) {
        return this.uqs.task.Department.boxId(id);//boxId是根据id获取基础信息,获取字段列表为TUID里定义为main的字段
    }

    boxStaffmember(id:number) {
        return this.uqs.task.Department.boxId(id);;//boxId是根据id获取基础信息,获取字段列表为TUID里定义为main的字段
    }

}