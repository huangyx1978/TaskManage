import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page, UiSchema, Schema, UiTextItem, Form, UiTextAreaItem, UiButton, Context, UiIdItem, UiRange, NumSchema,SearchBox,List } from 'tonva';
import {CTask} from './CTask';

export class VCallDepartment extends VPage<CTask> {
    async open() {
        this.openPage(this.page)
    }

    /*单个数据项输出界面元素*/
    private renderDepartment=(department:any, index:number) => {
        let {no,name,companyname} = department;//将department对象的no属性,name属性,companyname属性自动赋值给同名的变量,一种语法糖,类似于C#中Json对象与类的实例自动转换,通过名称自动匹配
        let left = <FA name="car" className="text-success mx-2" fixWidth={true} size="lg" />;//列表左侧显示当地界面元素
        let right = <span className="align-items-center">{companyname}</span>;//列表右侧显示的界面元素
        return <LMR className="px-3 py-2 align-items-center cursor-pointer" left={left} right={right} ><b className="h6">{name}</b></LMR>//输出包含左中右三个分区的列表项
    }

    /*页面滚动到底部时触发的操作*/
    private onScrollBottom = () => {
       this.controller.pager.more();//执行下一页的查询
    }

     private onseach= async (seachkey:string)=>{
       await this.controller.pager.first({key:seachkey});//将参数包装成一个Json对象的属性
    }


    private onItemClick = (item:any) => {
        this.returnCall(item);
        this.closePage();
    }

    private page =() =>{
        let header=<SearchBox label="选择部门" onSearch={this.onseach} className="w-100"/>
        //let footer=<div>公司机构</div>
        return <Page header={header} headerClassName="bg-primary align-middle" onScrollBottom={this.onScrollBottom}>
            {/*输出列表,其中属性items为数据集合,属性item为遍历数据集合时调用的输出界面元素的方法,
            该方法两个参数,第一个参数就是遍历数据集合时当前数据项,第二个参数为数据项在集合中的索引*/}
            <List items={this.controller.callpager} item={{render: this.renderDepartment, onClick: this.onItemClick} }/> 
        </Page>

    }

}