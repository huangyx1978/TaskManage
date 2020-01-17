import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page, UiSchema, Schema, UiTextItem, Form, tv,UiTextAreaItem, UiButton, Context, UiIdItem, UiRange, NumSchema,SearchBox,List } from 'tonva';
import {CTask,taskdetail} from './CTask';

export class VAddTaskdetail extends VPage<CTask>{
    async open(taskdetail:taskdetail)
    {
        this.openPage(this.page,taskdetail);
    }

    private staffpickid = async (context: Context, name: string, value: number)=>{
        let ret = await this.controller.callstaff();
        return ret;
    }

    private renderStaff = (item: any) => {
        let boxId = this.controller.boxStaffmember(item);//根据基础信息id获取基础信息
        return tv(boxId,(values) => <span>{values.name}</span>);//将基础信息的内容进行组织并输出
    }

    private  buttonclick= async (name:string,context:Context)=> {
        if(name=='commit')
        {
            this.controller.addtaskdetail(context.data);
            this.closePage();
        }
    }
    
    private page =(taskdetail:taskdetail) =>{
        let formdate={...taskdetail};//将参数对象的属性自动生成同名元素的Json对象,效果等同上一句

        let schema: Schema=[
            {name:'fdate', type:'date',required:true},
            {name:'staffmember', type:'id' ,required:true},
            {name:'title', type:'string' ,required:true},
            {name:'taskdesc', type:'string' ,required:true},
            {name:'integral', type:'number' ,required:true},
            {name:'commit', type:'submit'}
        ];

        let uis: UiSchema={
            items:{
                fdate:{widget:'date',label:'计划完成日期'},
                staffmember:{widget: 'id', label: '经办人', pickId: this.staffpickid, Templet: this.renderStaff} as UiIdItem,//通过pickId来调用打开选取公司机构的弹出窗体,Templet来调用方法用于组织显示内容
                title:{widget:'text', label:'标题'} as UiTextItem,
                taskdesc:{widget:'textarea', label:'任务内容'} as UiTextAreaItem,
                integral:{widget:'updown', label:'积分'},
                commit:{widget:'button', label: '提交',className:'btn btn-primary w-100'} as UiButton 
            }
        };

        

        return <Page header='添加任务明细' headerClassName="bg-primary" back="close">
            <Form schema={schema} uiSchema={uis} formData={formdate} fieldLabelSize={2} onButtonClick={this.buttonclick} className="m-3"/>
        </Page>

    }
}