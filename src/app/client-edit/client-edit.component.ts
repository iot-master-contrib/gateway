import {Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NzCardComponent} from "ng-zorro-antd/card";
import {RequestService, SmartFormComponent, SmartFormItem} from "iot-master-smart";

@Component({
    selector: 'app-client-edit',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonComponent,
    RouterLink,
    NzCardComponent,
    SmartFormComponent,
  ],
    templateUrl: './client-edit.component.html',
    styleUrls: ['./client-edit.component.scss'],
})
export class ClientEditComponent implements OnInit {
  id: any = '';

  @ViewChild('form') form!: SmartFormComponent

  fields: SmartFormItem[] = [
    {key: "id", label: "ID", type: "text", min: 2, max: 30, placeholder: "选填"},
    {key: "name", label: "名称", type: "text", required: true, default: '新客户端'},
    {key: "net", label: "网络", type: "select", default: 'tcp', options:[
            {label: 'TCP', value:'tcp'},
            {label: 'UDP', value:'udp'},
        ]},
    {key: "addr", label: "地址", type: "text"},
    {key: "port", label: "端口", type: "number", min:1,max:65535},
      {key: "poller_period", label: "采集周期", type: "number", min:0},
      {key: "poller_interval", label: "采集间隔", type: "number", min:0},
      {key: "protocol_name", label: "通讯协议", type: "select", options:[
              {label: 'Modbus RTU', value:'modbus-rtu'},
              {label: 'Modbus TCP', value:'modbus-tcp'},
          ]
      },
      {key: "retry_timeout", label: "重连超时", type: "number", min:0},
      {key: "retry_maximum", label: "重连最大次数", type: "number", min:0},
    {key: "description", label: "说明", type: "textarea"},
  ]

  values: any = {}


  constructor(private router: Router,
              private msg: NzMessageService,
              private rs: RequestService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.load()
    }
  }

  load() {
    this.rs.get(`client/` + this.id).subscribe((res) => {
      this.values = res.data
    });
  }

  onSubmit() {
    if (!this.form.Validate()) {
      this.msg.error('请检查数据')
      return
    }

    let url = `client/${this.id || 'create'}`
    this.rs.post(url, this.form.Value()).subscribe((res) => {
      this.router.navigateByUrl('/admin/client/' + res.data.id);
      this.msg.success('保存成功');
    });
  }
}
