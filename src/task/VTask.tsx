import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page,List, tv,SearchBox } from 'tonva';
import {CTask} from './CTask';

export class VTask extends VPage<CTask>{
    async open(param:any){

    }

    /*页面滚动到底部时触发的操作*/
    private onScrollBottom = () => {
        this.controller.pager.more();//执行下一页的查询
    }

    /*点击展示任务详情*/
    private onItemClick = (item:any) => {
        this.controller.showtaskdetail(item);
    }

    /*按条件进行筛选,涉及到与后台交互的方法都要加异步标识*/
    private onseach= async (seachkey:string)=>{
        await this.controller.pager.first({key:seachkey});//将参数包装成一个Json对象的属性
     }

     /*点击增加按钮时打开任务登记页面*/
    private onAddClick=() =>{
        this.controller.showaddtask();
    }

    render(){
        let header=<SearchBox label="我的任务" onSearch={this.onseach} className="w-100 px-3 py-2"/>
        let right=<button className="btn btn-success rounded align-self-center mr-2" onClick={this.onAddClick}>增加</button>
        return <Page header={header} headerClassName="bg-info align-middle" right={right} onScrollBottom={this.onScrollBottom}>
            {/*输出列表,其中属性items为数据集合,属性item为遍历数据集合时调用的输出界面元素的方法,
            该方法两个参数,第一个参数就是遍历数据集合时当前数据项,第二个参数为数据项在集合中的索引*/}
            <List items={this.controller.pager} item={{render: this.renderTask, onClick: this.onItemClick} }/> 
        </Page>
    }

    /*单个数据项输出界面元素*/
    private renderTask=(task:any, index:number) => {
        let {title,taskdesc,integral,fdate,staffmember} = task;//将company对象的no属性,name属性,telephone属性自动赋值给同名的变量,一种语法糖,类似于C#中Json对象与类的实例自动转换,通过名称自动匹配
        let left = <FA name="tasks" className="text-success mx-2" fixWidth={true} size="lg" />;//列表左侧显示当地界面元素
        let right = <span className="align-items-center">{tv(staffmember,(valus)=>valus.name)}</span>;//列表右侧显示的界面元素,选择显示boxid类型对象的内容
        return <LMR className="px-3 py-2 align-items-center cursor-pointer" left={left} right={right} ><b className="h6">{title}</b></LMR>//输出包含左中右三个分区的列表项
    }


}