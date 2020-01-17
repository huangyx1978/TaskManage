import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page, UiSchema, Schema, UiTextItem, Form, tv,UiTextAreaItem, UiButton, Context, UiIdItem, UiRange, NumSchema,SearchBox,List, UiCustom } from 'tonva';
import {CTask,taskdetail} from './CTask';

export class VTaskDetails extends VPage<CTask>{
    async open(taskdetail:taskdetail)
    {
        this.openPage(this.page,taskdetail);
    }

    private renderCompany = (item: any) => {
        //let boxId = this.controller.boxCompany(item);//根据基础信息id获取基础信息
        return tv(item, values => <input className="form-control required-item" type="text" readOnly={true} value={values.name}></input>);//将基础信息的内容进行组织并输出
        //return tv(boxId);//不带第二个参数的时候内容输出格式在 tvs.tsx中定义
    }

    private renderDepartment = (item: any) => {
        //let boxId = this.controller.boxDepartment(item);//根据基础信息id获取基础信息
        return tv(item, values => <input className="form-control required-item" type="text" readOnly={true} value={values.name}></input>);//将基础信息的内容进行组织并输出
    }

    private renderStaff = (item: any) => {
        //let boxId = this.controller.boxStaffmember(item);//根据基础信息id获取基础信息
        //return tv(boxId,(values) => <span>{values.name}</span>);//将基础信息的内容进行组织并输出

        return tv(item, values => <input className="form-control required-item" type="text" readOnly={true} value={values.name}></input>);
    }
    
    private page =(taskdetail:taskdetail) =>{
        let formdate={...taskdetail};//将参数对象的属性自动生成同名元素的Json对象,效果等同上一句

        let schema: Schema=[
            {name:'company', type:'id',required:true},
            {name:'department', type:'id' ,required:true},
            {name:'fdate', type:'date',required:true},
            {name:'staffmember', type:'id' ,required:true},
            {name:'title', type:'string' ,required:true},
            {name:'taskdesc', type:'string' ,required:true},
            {name:'integral', type:'number' ,required:true},
        ];

        let uis: UiSchema={
            items:{
                company:{widget: 'text', label: '公司机构', readOnly:true,Templet: this.renderCompany} as UiTextItem,//通过pickId来调用打开选取公司机构的弹出窗体,Templet来调用方法用于组织显示内容
                department:{widget: 'text', label: '部门', readOnly:true,Templet: this.renderDepartment} as UiTextItem,//通过pickId来调用打开选取部门的弹出窗体
                fdate:{widget:'date',label:'计划完成日期', readOnly:true},
                staffmember:{widget: 'text', label: '经办人', readOnly:true, Templet: this.renderStaff} as UiTextItem,//通过pickId来调用打开选取公司机构的弹出窗体,Templet来调用方法用于组织显示内容
                title:{widget:'text', label:'标题', readOnly:true} as UiTextItem,
                taskdesc:{widget:'textarea', label:'任务内容', readOnly:true} as UiTextAreaItem,
                integral:{widget:'updown', label:'积分', readOnly:true}
            }
        };

        return <Page header='任务详情' headerClassName="bg-primary" back="close">
            <Form schema={schema} uiSchema={uis} formData={formdate} fieldLabelSize={2} className="m-3" requiredFlag={false} />
        </Page>

    }
}