import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page } from 'tonva';
import {CHyx} from './CHyx';



const cli="list-group-item cursor-pointer";
const Li = (caption:string,onClick:()=>void,index:number) => <li className={cli} onClick={onClick} key={index}>{caption}</li>;
interface InfoItem{
    caption:string,
    onClick:()=>void
}

export class VHyx extends VPage<CHyx>{
    async open(param?: any) {
        
    }

    private arr:InfoItem[]=[
        {caption:"产品",onClick:this.controller.showProduct},
        {caption:"客户",onClick:this.controller.showCustomer}
    ]


    render(){
        return <Page header="基础信息" headerClassName="bg-info">
            <div>
            <ul className="list-group">
                {this.arr.map((v,index)=>{
                   return Li(v.caption,v.onClick,index);//输出单个项的UI
                })}
            </ul>
            </div>
        </Page>
    }
    
}