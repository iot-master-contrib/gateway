import {Component} from '@angular/core';
import {NzCardComponent} from "ng-zorro-antd/card";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {RequestService, SmartTableEditComponent, SmartTableEditItem} from "iot-master-smart";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute} from "@angular/router";
import {NzSpaceModule} from "ng-zorro-antd/space";

@Component({
    selector: 'app-modbus-mapper-edit',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NzFormModule,
        NzSpaceModule,
        NzCardComponent,
        NzButtonComponent,
        NzIconDirective,
        SmartTableEditComponent,
        NzSelectModule,
        NzInputNumberComponent,
    ],
    templateUrl: './modbus-mapper-edit.component.html',
    styleUrl: './modbus-mapper-edit.component.scss'
})
export class ModbusMapperEditComponent {

    //group!: FormGroup;
    group!: any;

    id: any = 0;
    version: any = 0;

    columns: SmartTableEditItem[] = [
        {label: '变量', key: 'name'},
        {label: '名称', key: 'label'},
        {
            label: '类型', key: 'type', type: 'select', default: 'uint16',
            options: [
                {label: 'BIT', value: 'bit'},
                {label: 'INT16', value: 'int16'},
                {label: 'UINT16', value: 'uint16'},
                {label: 'INT32', value: 'int32'},
                {label: 'UINT32', value: 'uint32'},
                {label: 'FLOAT', value: 'float'},
                {label: 'DOUBLE', value: 'double'}
            ]
        },
        {label: '偏移', key: 'offset', type: 'number', default: 0},
        {label: '位', key: 'bits', type: 'number', default: 0},
        {label: '大端', key: 'be', type: 'switch', default: true},
        {label: '倍率', key: 'rate', type: 'number', default: 1}
    ]

    columnBits: SmartTableEditItem[] = [
        {label: '变量', key: 'name'},
        {label: '名称', key: 'label'},
        {label: '偏移', key: 'offset', type: 'number', default: 0}]

    constructor(private fb: FormBuilder,
                private msg: NzMessageService,
                private rs: RequestService,
                private route: ActivatedRoute) {
        this.build();
    }

    ngOnInit() {
        this.id = this.route.snapshot.queryParamMap.get("product")
        this.version = this.route.snapshot.queryParamMap.get("version")

        if (this.id && this.version) {
            let url = `/api/product/${this.id}/version/${this.version}/config/modbus_mapper`;
            this.rs.get(url).subscribe((res) => {
                this.build(res.data);
            });
        } else {
            //报错
        }
        this.build();
    }

    build(mappers?: any) {
        mappers = mappers || [];
        this.group = this.fb.group({
            mappers: this.fb.array(mappers.map((prop: any) =>
                this.fb.group({
                    code: [prop.code || 3, []],
                    address: [prop.address || 0, []],
                    size: [prop.size || 1, []],
                    points: [prop.points || [], []],
                }))),
        })
    }

    submit() {
        this.group.updateValueAndValidity();
        if (this.group.valid) {
            let url = `/api/product/${this.id}/version/${this.version}/config/modbus_mapper`;
            this.rs.post(url, this.group.value.mappers).subscribe((res) => {
                this.msg.success('保存成功');
            });
            return;
        } else {
            Object.values(this.group.controls).forEach((control: any) => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
        }
    }

    add() {
        this.group.get('mappers').push(
            this.fb.group({
                code: [3, []],
                address: [0, []],
                size: [1, []],
                points: [[], []],
            })
        );
    }

    del(i: number) {
        this.group.get('mappers').removeAt(i);
    }
}
