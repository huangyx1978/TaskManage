import { CUqBase } from "tonvaApp";
import _ from 'lodash';
import { VHyx } from "./VHyx";
import {VProductList} from './VProductList';
import {VCustomerList} from './VCustomerList';
import { QueryPager, Query } from "tonva";
import { TuidSaveResult } from "tonva/dist/uq/tuid/tuid";
import { promises } from "dns";
import { createNo } from "tool/tools";

/*所有的交互操作都放在该Control中*/
export class CHyx extends CUqBase{
    pager: QueryPager<any>;//定义全局的支持分页查询的操作对象,在此定义的全局对象,在后面的View里都能通过this.controller来调用
    callpager:QueryPager<any>;
    /*必需的定义*/
    protected async internalStart(){

    }
    
    tab = () =>this.renderView(VHyx);//必需的定义

    /********************************************************************************************************************/
    /***********************************************产品信息**************************************************************/
    /********************************************************************************************************************/
    showProduct =async ()=>{
        this.openVPage(VProductList);
    }

    /********************************************************************************************************************/
    /***********************************************客户信息**************************************************************/
    /********************************************************************************************************************/
    showCustomer =async ()=>{
        this.openVPage(VCustomerList);
    }




}