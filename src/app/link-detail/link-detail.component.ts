import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterState} from "@angular/router";
import {RequestService} from "iot-master-smart";
import {JsonPipe} from "@angular/common";
import {NzTabComponent, NzTabDirective, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {DeviceComponent} from "../device/device.component";

@Component({
    selector: 'app-link-detail',
    templateUrl: './link-detail.component.html',
    standalone: true,
    imports: [
        JsonPipe,
        NzTabSetComponent,
        NzTabComponent,
        NzTabDirective,
        DeviceComponent
    ],
    styleUrls: ['./link-detail.component.scss']
})
export class LinkDetailComponent implements OnInit {
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
    this.rs.get(`link/${this.id}`).subscribe(res => {
      this.data = res.data;
    })
  }

}
