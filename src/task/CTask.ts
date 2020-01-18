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

export interface Taskmain{
    company:BoxId;
    department:BoxId,
}

interface Taskitem{
    company: BoxId;
    department: BoxId,
    staffmember: BoxId,
    fdate: Date,
    title: string,
    taskdesc: string,
    integral:number
}

export class CTask extends CUqBase{
    pager: QueryPager<any>;//定义全局的支持分页查询的操作对象,在此定义的全局对象,在后面的View里都能通过this.controller来调用
    callpager:QueryPager<any>;
    @observable taskDetail: taskdetail[];
    /*必需的定义*/
    protected async internalStart(){
        /*初始化时提供数据*/
        this.pager=new QueryPager(this.uqs.taskmanage.QueryTask,10,30);
        this.pager.setItemDeepObservable();
        await this.pager.first({key:''});
    }
    
    tab = () =>this.renderView(VTask);//必需的定义

    /*VTask调用,显示任务详情*/
    showtaskdetail =(taskdetail:any)=>{
        this.openVPage(VTaskDetails,taskdetail);
    }

    /*VTask调用,显示新增任务登记页面*/
    showaddtask = () =>{
        this.taskDetail = [];
        this.openVPage(VAddTask);
    }

    /*VAddTask调用,用于显示选择公司机构的页面*/
    callcompany = async ():Promise<any> =>{
        this.callpager = new QueryPager(this.uqs.task.QueryCompany, 10, 30);//实例化分页查询操作对象
        this.callpager.setItemDeepObservable();//执行这个方法后可实现绑定了当前paper的View自动刷新显示
        await this.callpager.first({key:''});//执行第一次查询,前面需要加await,因为这是异步查询
        return this.vCall(VCallCompany);//openVPage可以传第二个参数,如果有传第二个参数,则对应view里面的open方法需要定义入参用于接收改参数,query的查询结果对应数组类型any[]
     }

    /*VAddTask调用,用于更加id获取公司机构信息并包装成boxid对象*/
    boxCompany(id:number) {
        return this.uqs.task.Company.boxId(id);//boxId是根据id获取基础信息,获取字段列表为TUID里定义为main的字段
    }

    /*VAddTask调用,用于显示选择部门的页面*/
    calldepartmen = async ():Promise<any> =>{
        this.callpager = new QueryPager(this.uqs.task.QueryDepartment, 10, 30);//实例化分页查询操作对象
        this.callpager.setItemDeepObservable();//执行这个方法后可实现绑定了当前paper的View自动刷新显示
        await this.callpager.first({key:''});//执行第一次查询,前面需要加await,因为这是异步查询
        return this.vCall(VCallDepartment);//openVPage可以传第二个参数,如果有传第二个参数,则对应view里面的open方法需要定义入参用于接收改参数,query的查询结果对应数组类型any[]
    }

    /*VAddTask调用,用于更加id获取部门信息并包装成boxid对象*/
    boxDepartment(id:number) {
        return this.uqs.task.Department.boxId(id);//boxId是根据id获取基础信息,获取字段列表为TUID里定义为main的字段
    }

    /*VAddTask调用,显示新增任务明细页面*/
    showaddtaskdetail =()=>{
        this.openVPage(VAddTaskdetail);
    }

    /*VAddTask调用,删除一个任务项*/
    deletetaskdetail = (item:any,index:number)=>{
        this.taskDetail.splice(index,1);//从数组中删除项
    }


    /*VAddTask调用,用于保存任务登记单据*/
    savetask = async(data:any):Promise<any>=>{
        let {Task,Submitintegral} =  this.uqs.taskmanage;//将taskmanage对象的属性赋给同名变量
        //使用页面数组生成Sheet的数据结构
        let {company,department} = data;
        let taskitem={company:company,department:department,taskdetail:this.taskDetail};
        //进行单据保存
        let ret1 = await Task.save('初始提交',taskitem);//返回对象中date 单据日期,flow 提交流水,id 单据id,no 单据编号,name 单据名称
        //调用单据的名称为save的Action进行写账提交
        let ret2 = await Task.action(ret1.id,ret1.flow,ret1.state,'save'); 
        //调用名为Submitintegral的Action,将数据写入BUS
        let ret3= await Submitintegral.submit(taskitem);
        //await Task.getSheet(1);//获取单据
        //await Task.action(1, 1, '$', 'ccc');//第一个参数是单据id,第二个参数是flowid(提交记录流水,相当于老平台的stateflowid),第三个参数是当前状态,第四个参数是要调用的action的名字
        //await Task.getStateSheets('$', 0, 100);//根据状态获取单据
        let owcompany = this.uqs.task.Company.boxId(company.id);
        let owdepartment=this.uqs.task.Department.boxId(department.id);
        this.taskDetail.map(async (v, index)=>{    
            let owstffmember=this.uqs.task.StaffMember.boxId(v.staffmember.id);
            let tempdata:Taskitem = {company:owcompany,department:owdepartment,staffmember:owstffmember,fdate:v.fdate,title:v.title,taskdesc:v.taskdesc,integral:v.integral};
            this.pager.items.unshift(tempdata);
        });
        return ret1;
    }

    /*VAddTaskdetail调用,用于显示选择职员的页面*/
    callstaff = async ():Promise<any> =>{
    this.callpager = new QueryPager(this.uqs.task.QueryStaffMember, 10, 30);//实例化分页查询操作对象
    this.callpager.setItemDeepObservable();//执行这个方法后可实现绑定了当前paper的View自动刷新显示
    await this.callpager.first({key:''});//执行第一次查询,前面需要加await,因为这是异步查询
    return this.vCall(VCallstaff);//openVPage可以传第二个参数,如果有传第二个参数,则对应view里面的open方法需要定义入参用于接收改参数,query的查询结果对应数组类型any[]
    }

    /*VAddTaskdetail调用,用于根据id获取职员信息并包装成boxid对象*/
    boxStaffmember(id:number) {
        return this.uqs.task.Department.boxId(id);;//boxId是根据id获取基础信息,获取字段列表为TUID里定义为main的字段
    }

    /*VAddTaskdetail调用,用于向任务明细添加任务项*/
    addtaskdetail =(taskdetail:taskdetail)=>{
        this.taskDetail.push(taskdetail);//将项追加到数组末尾,unshift先开头追加元素,splice删除指定索引的元素
    }

 



}