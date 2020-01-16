import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs, Image } from 'tonva';
import { CApp } from '../CApp';
// import { setting } from 'configuration';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.openPage(this.render);
    }
    // opensrc = () => {
    //     window.open(setting.downloadAppurl);
    // }

    render = (param?: any): JSX.Element => {
        let {  cMe, cTask /*, cHome,cPosts, cHyx ,cStructure,cMedia, cTemplets*/ } = this.controller;
        let faceTabs = [
            //{ name: 'structure', label: '组织架构', icon: 'cogs', content: cStructure.tab,  onShown:cStructure.querycompanylist},//onShow指定显示时调用的方法,可在这里准备要显示的数据
            //{ name: 'hyx', label: '基础信息', icon: 'tasks', content: cHyx.tab },
            //    onShown:cPosts.loadList, notify: undefined },
            //{ name: 'image', label: '图片', icon: 'vcard', content: cMedia.tab, onShown:cMedia.loadList },
            //{ name: 'templet', label: '模板', icon: 'vcard', content: cTemplets.tab, onShown:cTemplets.loadList },
            { name:'task', label:'我的任务', icon: 'tasks', content: cTask.tab},
            { name: 'me', label: '个人中心', icon: 'user', content: cMe.tab }
        ].map(v => {
            let { name, label, icon, content/*, notify, onShown*/ } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content: content,
                //notify: notify,
                //onShown: onShown,
            }
        });
        return <Page header={false} headerClassName={"bg-info"} >
            <Tabs tabs={faceTabs} />
        </Page>;
        //
    }
}
