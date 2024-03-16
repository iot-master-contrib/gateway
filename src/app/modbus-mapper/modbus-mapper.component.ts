import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzCardComponent} from "ng-zorro-antd/card";
import {
    RequestService,
    SmartInfoComponent,
    SmartInfoItem,
    SmartTableColumn,
    SmartTableComponent
} from "iot-master-smart";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-modbus-mapper',
    standalone: true,
    imports: [
        CommonModule,
        NzCardComponent,
        SmartInfoComponent,
        SmartTableComponent,
    ],
    templateUrl: './modbus-mapper.component.html',
    styleUrl: './modbus-mapper.component.scss'
})
export class ModbusMapperComponent {

    mappers: any = [];

    id: any = 0;
    version: any = 0;

    fields: SmartInfoItem[] = [
        {label: '功能码', key: 'code'},
        {label: '地址', key: 'address'},
        {label: '长度', key: 'size'},
    ]

    columns: SmartTableColumn[] = [
        {label: '变量', key: 'name'},
        {label: '名称', key: 'label'},
        {label: '类型', key: 'type'},
        {label: '偏移', key: 'offset'},
        {label: '位', key: 'bits'},
        {label: '大端', key: 'be'},
        {label: '倍率', key: 'rate'}
    ]

    columnBits: SmartTableColumn[] = [
        {label: '变量', key: 'name'},
        {label: '名称', key: 'label'},
        {label: '偏移', key: 'offset'}
    ]

    constructor(private rs: RequestService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.queryParamMap.get("product")
        this.version = this.route.snapshot.queryParamMap.get("version")

        if (this.id && this.version) {
            let url = `/api/product/${this.id}/version/${this.version}/config/modbus_mapper`;
            this.rs.get(url).subscribe((res: any) => {
                this.mappers = res.data;
            });
        } else {
            //报错
        }
    }
}
