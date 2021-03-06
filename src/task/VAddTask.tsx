import * as React from 'react';
import _ from 'lodash';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page,List, tv,SearchBox , UiSchema, Schema, UiTextItem, Form, UiTextAreaItem, UiButton, Context,BoxId,UiIdItem, Tuid, UiArr, ArrSchema, StringSchema, UiCustom, ItemSchema} from 'tonva';
import {CTask} from './CTask';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export class VAddTask extends VPage<CTask> {
    private form: Form;

    async open(){
        this.openPage(this.page);
    }

    /*弹出选公司机构页面,并将选中的记录返回*/
    private companypickid = async (context: Context, name: string, value: number)=>{
        let ret = await this.controller.callcompany();
        return ret;
    }
    
    private renderCompany = (item: any) => {
        return tv(item,(values) => <span>{values.name}</span>);//将基础信息的内容进行组织并输出
    }
    
    /*弹出选部门页面,并将选中的记录返回*/
    private departmentpickid = async (context: Context, name: string, value: number)=> {
        let ret = await this.controller.calldepartmen();
        return ret;
    }

    private renderDepartment = (item: any) => {
        return tv(item,(values) => <span>{values.name}</span>);//将基础信息的内容进行组织并输出
    }

    private renderStaffMember = (item: any) => {
        return tv(item,(values) => <span>{values.name}</span>);//将基础信息的内容进行组织并输出
    }
  
    private addtaskdetail =() =>{
        this.controller.showaddtaskdetail();
    }

    private showdrafts =() =>{
        alert('点击了草稿箱');
    }

    /*删除任务项*/
    private Deletedetail =(item:any,index:number)=>{
        this.controller.deletetaskdetail(item,index);
    }

    //提交单据
    private onSubmit = async () => {
        let data = this.form.data;//获取Form的数据
        if(this.controller.taskDetail.length===0)
        {
            await this.controller.confirm({caption:'提示', message: '还没有录入任何任务!', ok:'确定'});
            return;
        }
        let ret= await this.controller.savetask(data);
        if(ret.id>0)
        {
            let ret1 = await this.controller.confirm({caption:'提示', message: '提交成功', ok:'确定'});
            if (ret1 === 'ok')
            {
                this.closePage();
            }
        }
        else
        {
            let ret1 = await this.controller.confirm({caption:'提示', message: '提交失败', ok:'确定'});
        }
    }

    private onSaveclick = async () =>{
        alert("点击了保存为草稿");
    }

    private page = observer(() =>{
        let schema: Schema=[
            {name:'company', type:'id',required:true},//主表字段
            {name:'department', type:'id' ,required:true},//主表字段
            /*{name:'taskdetail', type:'arr', 
                arr: [
                    {name: 'fdate', type: 'date'},//明细字段
                    {name: 'staffmember', type: 'id'},//明细字段
                    {name: 'title', type: 'string'},//明细字段
                    {name: 'taskdesc', type: 'string'},//明细字段
                    {name: 'integral', type: 'number'}//明细字段
                ]
            } as ArrSchema,//明细结构
            {name:'commit', type:'submit'}*///提交按钮
        ];



        let uis: UiSchema={
            items:{
                company:{widget: 'id', label: '公司机构', pickId: this.companypickid, Templet: this.renderCompany} as UiIdItem,//通过pickId来调用打开选取公司机构的弹出窗体,Templet来调用方法用于组织显示内容
                department:{widget: 'id', label: '部门', pickId: this.departmentpickid,Templet: this.renderDepartment} as UiIdItem,//通过pickId来调用打开选取部门的弹出窗体
                
                /*{
                    widget:'arr', label:'任务明细', //ArrContainer: this.arrrender, RowContainer:this.rowrender,
                    items: {
                        fdate:{widget:'date',label:'计划完成日期', readOnly:true},
                        staffmember:{widget: 'text', label: '经办人', readOnly:true, Templet: this.renderStaff} as UiTextItem,//通过pickId来调用打开选取公司机构的弹出窗体,Templet来调用方法用于组织显示内容
                        title:{widget:'text', label:'标题', readOnly:true} as UiTextItem,
                        taskdesc:{widget:'textarea', label:'任务内容', readOnly:true} as UiTextAreaItem,
                        integral:{widget:'updown', label:'积分', readOnly:true}
                    }
                } as UiArr*/
                //commit:{widget:'button', label: '提交',className:'btn btn-primary w-100'} as UiButton 
            }
        };

        let right=<button className="btn btn-success rounded align-self-center mr-2" onClick={this.showdrafts}>草稿箱</button>
        //formData={this.controller.task} 
        return <Page header='新建任务' right={right} headerClassName="bg-primary" back="close">
            {/*主表*/}
            <Form ref={f => this.form = f}//这种固定写法可将Form赋给变量form,通过form可获取页面输入的数据
                schema={schema} uiSchema={uis} 
                fieldLabelSize={2} className="m-3"/>
            {/*明细*/}
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-pills card-header-pills">
                        <li className="nav-item">
                            <span className="nav-link">任务明细</span>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-primary btn-sm" onClick={this.addtaskdetail}><b>+</b></button>
                        </li>
                    </ul>
                </div>
                <div className="card-body">   
                    <List items={this.controller.taskDetail} item={{render: this.renderDetailRow}} />
                </div>
            </div>
            <button className='btn btn-primary w-50 py-2' onClick={this.onSubmit}>提 交</button>
            <button className='btn btn-primary w-50 py-2' onClick={this.onSaveclick}>保存为草稿</button>
        </Page>
    });


        /*
    private arrrender=(label: any, content: JSX.Element)=>{
        return <div>
            <div>{label}</div>
            <div>{content}</div>
        </div>;
    }

    private rowrender=(content: JSX.Element)=>{
        return <div>{content}</div>
    }
    */

   private renderDetailRow = (item:any, index:number) => {
        return <div className="card">
            <div><button onClick={()=> this.Deletedetail(item,index)}>删除</button></div>{/*onClick 赋值匿名函数就可以把对应item获取过来做参数*/}
            <div className="card-body">
            <h5 className="card-title"><b>{item.title}</b></h5>
            <p className="card-text">{item.taskdesc}</p>
            <span>完成日期:{item.fdate}</span><span>积分:{item.integral}</span><span>任务人:{this.renderStaffMember(item.staffmember)}</span>
            </div>
        </div>
    }



}

