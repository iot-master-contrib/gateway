import {Component} from '@angular/core';
import {RequestService, SmartInfoComponent, SmartInfoItem} from "iot-master-smart";
import {CommonModule} from "@angular/common";
import {NzCardComponent} from "ng-zorro-antd/card";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-modbus-station',
    standalone: true,
    imports: [
        CommonModule,
        NzCardComponent,
        SmartInfoComponent,
    ],
    templateUrl: './modbus-station.component.html',
    styleUrl: './modbus-station.component.scss'
})
export class ModbusStationComponent {

    data: any = {};

    id: any = 0;

    fields: SmartInfoItem[] = [
        {label: '通道ID', key: 'tunnel_id'},
        {label: '从站号', key: 'modbus_station'},
    ]

    constructor(private rs: RequestService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.queryParamMap.get("device")

        if (this.id) {
            let url = `device/${this.id}`;
            this.rs.get(url).subscribe((res: any) => {
                this.data = res.data;
            });
        } else {
            //报错
        }
    }
}
