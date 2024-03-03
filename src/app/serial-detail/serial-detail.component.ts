import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RequestService } from "iot-master-smart";
import {JsonPipe} from "@angular/common";
import {NzTabComponent, NzTabDirective, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {DeviceComponent} from "../device/device.component";

@Component({
    selector: 'app-serial-detail',
    templateUrl: './serial-detail.component.html',
    standalone: true,
    imports: [
        JsonPipe,
        NzTabSetComponent,
        NzTabComponent,
        NzTabDirective,
        DeviceComponent
    ],
    styleUrls: ['./serial-detail.component.scss']
})
export class SerialDetailComponent implements OnInit {
  id: string = ""
  data: any = {}

  constructor(private route: ActivatedRoute, private rs: RequestService) { }

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
}
