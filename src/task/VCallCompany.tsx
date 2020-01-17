import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page, UiSchema, Schema, UiTextItem, Form, UiTextAreaItem, UiButton, Context, UiIdItem, UiRange, NumSchema,SearchBox,List } from 'tonva';
import {CTask} from './CTask';

export class VCallCompany extends VPage<CTask> {
    async open() {
        this.openPage(this.page)
    }

    /*单个数据项输出界面元素*/
    private renderCompany=(company:any, index:number) => {
        let {no,name,telephone} = company;//将company对象的no属性,name属性,telephone属性自动赋值给同名的变量,一种语法糖,类似于C#中Json对象与类的实例自动转换,通过名称自动匹配
        let left = <FA name="car" className="text-success mx-2" fixWidth={true} size="lg" />;//列表左侧显示当地界面元素
        let right = <span className="align-items-center">{telephone}</span>;//列表右侧显示的界面元素
        return <LMR className="px-3 py-2 align-items-center cursor-pointer" left={left} right={right} ><b className="h6">{name}</b></LMR>//输出包含左中右三个分区的列表项
    }

    /*页面滚动到底部时触发的操作*/
    private onScrollBottom = () => {
    this.controller.callpager.more();//执行下一页的查询
    }

    private onseach= async (seachkey:string)=>{
    await this.controller.callpager.first({key:seachkey});//将参数包装成一个Json对象的属性
    }

    private onItemClick = (item:any) => {
        this.returnCall(item);//该方法将返回值返回给调用该callview的view
        this.closePage();//关闭页面
    }

    private page =() =>{
        let header=<SearchBox label="选择公司机构" onSearch={this.onseach} className="w-100"/>
        return <Page header={header} headerClassName="bg-primary align-middle" onScrollBottom={this.onScrollBottom}>
            {/*输出列表,其中属性items为数据集合,属性item为遍历数据集合时调用的输出界面元素的方法,
            该方法两个参数,第一个参数就是遍历数据集合时当前数据项,第二个参数为数据项在集合中的索引*/}
            <List items={this.controller.callpager} item={{render: this.renderCompany, onClick: this.onItemClick} }/> 
        </Page>
    }

}