import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {RequestService, SmartInfoComponent, SmartInfoItem} from "iot-master-smart";
import {NzTabComponent, NzTabDirective, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {CommonModule} from "@angular/common";
import {DeviceComponent} from "../device/device.component";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: 'app-serial-detail',
    templateUrl: './serial-detail.component.html',
    standalone: true,
    imports: [
        CommonModule,
        NzTabSetComponent,
        NzTabComponent,
        DeviceComponent,
        NzTabDirective,
        NzCardComponent,
        SmartInfoComponent,
        NzSpaceComponent,
        NzSpaceItemDirective,
        NzButtonComponent,
        RouterLink,
        NzPopconfirmDirective
    ],
    styleUrls: ['./serial-detail.component.scss']
})
export class SerialDetailComponent implements OnInit {
    id: string = ""
    data: any = {}


    fields: SmartInfoItem[] = [
        {key: 'id', label: 'ID'},
        {key: 'name', label: '名称'},
        {key: 'net', label: '网络'},
        {key: 'addr', label: '地址'},
        {key: 'port', label: '端口'},
        {key: 'disabled', label: '禁用'},
        {key: 'created', label: '创建时间', type: 'date'},
        {key: "poller_period", label: "采集周期"},
        {key: "poller_interval", label: "采集间隔"},
        {key: "protocol_name", label: "通讯协议"},
        {key: "retry_timeout", label: "重连超时"},
        {key: "retry_maximum", label: "重连最大次数"},
        {key: "baud_rate", label: "波特率"},
        {
            key: "parity_mode", label: "奇偶校验", type: "select",
            options: ['无校验 NONE', '奇校验 ODD', '偶校验 EVEN', '1校验 MARK', '0校验 SPACE']
        },
        {key: "stop_bits", label: "停止位"},
        {key: "data_bits", label: "字长"},
        {key: 'description', label: '说明', span: 2},
    ];

    constructor(
        private router: Router,
        private msg: NzMessageService,
        private rs: RequestService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        // @ts-ignore
        this.id = this.route.snapshot.paramMap.get("id")

        this.load()
    }

    load() {
        this.rs.get(`serial/${this.id}`).subscribe(res => {
            this.data = res.data;
        })
    }

    delete() {
        this.rs.get(`client/${this.id}/delete`, {}).subscribe((res: any) => {
            this.msg.success('删除成功');
            this.router.navigateByUrl('/client');
        });
    }
}
