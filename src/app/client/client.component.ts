import {Component, Optional} from '@angular/core';
import {
    ParamSearch, RequestService, SmartTableButton, SmartTableColumn,
    SmartTableComponent, SmartTableOperator
} from "iot-master-smart";

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    imports: [
        SmartTableComponent
    ],
    standalone: true
})
export class ClientComponent {
  datum: any[] = [];
  total = 0;
  loading = false;

  buttons: SmartTableButton[] = [
    {icon: "plus", text: "创建", link: () => `/client/create`}
  ];

  columns: SmartTableColumn[] = [
    {key: "id", sortable: true, text: "ID", keyword: true, link: (data) => `/client/${data.id}`},
    {key: "name", sortable: true, text: "名称", keyword: true},
    {key: "net", sortable: true, text: "网络", keyword: true},
    {key: "addr", sortable: true, text: "地址", keyword: true},
    {key: "port", sortable: true, text: "端口", keyword: true},
    {key: "created", sortable: true, text: "创建时间", date: true},
  ];

  operators: SmartTableOperator[] = [
    {icon: 'edit', title: '编辑', link: data => `/client/${data.id}/edit`},
    {
      icon: 'delete', title: '删除', confirm: "确认删除？", action: data => {
        this.rs.get(`client/${data.id}/delete`).subscribe(res => this.refresh())
      }
    },
  ];

  constructor(private rs: RequestService) {
  }


  query!: ParamSearch

  refresh() {
    this.search(this.query)
  }

  search(query: ParamSearch) {
    //console.log('onQuery', query)
    this.query = query
    this.loading = true
    this.rs.post('client/search', query).subscribe((res) => {
      this.datum = res.data;
      this.total = res.total;
    }).add(() => this.loading = false);
  }

}
