import {Component, Optional} from '@angular/core';
import { RequestService } from '../request.service';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {
  ParamSearch, SmartTableButton, SmartTableColumn,
  SmartTableComponent, SmartTableOperator
} from "iot-master-smart";

@Component({
  selector: 'app-server',
  standalone: true,
  imports: [
    CommonModule,
    SmartTableComponent,
  ],
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent {
  datum: any[] = [];
  total = 0;
  loading = false;

  buttons: SmartTableButton[] = [
    {icon: "plus", text: "创建", link: () => `/server/create`}
  ];

  columns: SmartTableColumn[] = [
    {key: "id", sortable: true, text: "ID", keyword: true, link: (data) => `/server/${data.id}`},
    {key: "name", sortable: true, text: "名称", keyword: true},
    {key: "port", sortable: true, text: "端口", keyword: true},
    {key: "created", sortable: true, text: "创建时间", date: true},
  ];

  operators: SmartTableOperator[] = [
    {icon: 'edit', title: '编辑', link: data => `/server/${data.id}/edit`},
    {
      icon: 'delete', title: '删除', confirm: "确认删除？", action: data => {
        this.rs.get(`server/${data.id}/delete`).subscribe(res => this.refresh())
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
    this.rs.post('server/search', query).subscribe((res) => {
      this.datum = res.data;
      this.total = res.total;
    }).add(() => this.loading = false);
  }

}
