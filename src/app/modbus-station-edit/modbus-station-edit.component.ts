import {Component, ViewChild} from '@angular/core';
import {NzCardComponent} from "ng-zorro-antd/card";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {RequestService, SmartFormComponent, SmartFormItem} from "iot-master-smart";
import {ActivatedRoute} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: 'app-modbus-station-edit',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NzFormModule,
        NzCardComponent,
        NzButtonComponent,
        NzIconDirective,
        NzCardComponent,
        SmartFormComponent,
    ],
    templateUrl: './modbus-station-edit.component.html',
    styleUrl: './modbus-station-edit.component.scss'
})
export class ModbusStationEditComponent {
    id: any = 0;
    data: any = {}

    @ViewChild('form') form!: SmartFormComponent

    fields: SmartFormItem[] = [
        {key: "tunnel_id", label: "连接ID", type: "text"},
        {key: "modbus_station", label: "从站号", type: "number", min: 1, max: 255, default: 1},
    ]

    constructor(private rs: RequestService, private msg: NzMessageService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.queryParamMap.get("device")

        if (this.id) {
            this.rs.get(`device/${this.id}`).subscribe((res: any) => {
                this.data = res.data
            });
        } else {
            //报错
        }
    }

    submit() {
        if (!this.form.Validate()) {
            this.msg.error('请检查数据')
            return
        }

        let url = `device/${this.id}`
        this.rs.post(url, this.form.Value()).subscribe((res) => {
            this.msg.success('保存成功');
        });
    }
}
