import { CAppBase, IConstructor } from "tonva";
import 'bootstrap/dist/css/bootstrap.css';
import { CUqBase } from "./tonvaApp/CBase";
import { UQs } from "./tonvaApp/uqs";
import { VMain } from './tonvaApp/main';
import { CMe } from "me/CMe";
import { CHome } from "home/CHome";
import {CHyx} from "info/CHyx";
import {CTask} from "task/CTask";

export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs };

    /*
    cHome: CHome;
    cHyx: CHyx;
    cStructure:CStructure;
    */
    cMe: CMe;
    cTask:CTask;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {
        /*
        this.cHome = this.newC(CHome);
        this.cHyx=this.newC(CHyx);
        this.cMe = this.newC(CMe);   
        this.cStructure=this.newC(CStructure); 
        await this.cStructure.start();//对应的是调用Control里的internalStart(),在这里初始化数据
        */
        this.cMe = this.newC(CMe); 
        this.cTask=this.newC(CTask);
        await this.cTask.start();//对应的是调用Control里的internalStart(),在这里初始化数据
        /*
        this.cPosts = this.newC(CPosts);
        this.cMedia = this.newC(CMedia);
        this.cTemplets = this.newC(CTemplets);
        */
        this.showMain();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }
}
