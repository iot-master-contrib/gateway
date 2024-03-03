import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    ParamSearch, RequestService, SmartTableButton, SmartTableColumn,
    SmartTableComponent, SmartTableOperator
} from "iot-master-smart";

@Component({
    selector: 'app-link',
  standalone: true,
  imports: [
    CommonModule,
    SmartTableComponent,
  ],
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  datum: any[] = [];
  total = 0;
  loading = false;

  buttons: SmartTableButton[] = [
    {icon: "plus", text: "创建", link: () => `/link/create`}
  ];

  columns: SmartTableColumn[] = [
    {key: "id", sortable: true, text: "ID", keyword: true, link: (data) => `/link/${data.id}`},
    {key: "server", sortable: true, text: "服务器", keyword: true, link: (data) => `/server/${data.server_id}`},
    {key: "name", sortable: true, text: "名称", keyword: true},
    {key: "remote", sortable: true, text: "远程地址", keyword: true},
    {key: "created", sortable: true, text: "创建时间", date: true},
  ];

  operators: SmartTableOperator[] = [
    {icon: 'edit', title: '编辑', link: data => `/link/${data.id}/edit`},
    {
      icon: 'delete', title: '删除', confirm: "确认删除？", action: data => {
        this.rs.get(`link/${data.id}/delete`).subscribe(res => this.refresh())
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
    this.rs.post('link/search', query).subscribe((res) => {
      this.datum = res.data;
      this.total = res.total;
    }).add(() => this.loading = false);
  }

}
