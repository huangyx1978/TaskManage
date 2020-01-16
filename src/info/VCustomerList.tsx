import * as React from 'react';
import { Page, VPage, ImageUploader, Form, ItemSchema, UiSchema, UiTextItem, ButtonWidget, UiButton, NumSchema, UiTextAreaItem } from 'tonva';
import { CHyx } from './CHyx';

export class VCustomerList extends VPage<CHyx>{
    async open(){
        this.openPage(this.page);
    }


    private page =() =>{

        return <Page header="客户" headerClassName="bg-primary">

        </Page>

    }
} 