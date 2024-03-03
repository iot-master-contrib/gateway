import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RequestService } from "iot-master-smart";
import {NzTabComponent, NzTabDirective, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {JsonPipe} from "@angular/common";
import {DeviceComponent} from "../device/device.component";

@Component({
    selector: 'app-client-detail',
    templateUrl: './client-detail.component.html',
    standalone: true,
    imports: [
        NzTabSetComponent,
        NzTabComponent,
        JsonPipe,
        DeviceComponent,
        NzTabDirective
    ],
    styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  id: string = ""
  data: any = {}

  constructor(private route: ActivatedRoute, private rs: RequestService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = this.route.snapshot.paramMap.get("id")
    this.load()
  }

  load() {
    this.rs.get(`client/${this.id}`).subscribe(res => {
      this.data = res.data;
    })
  }

}
