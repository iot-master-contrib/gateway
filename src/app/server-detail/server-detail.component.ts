import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterState} from "@angular/router";
import {RequestService} from "iot-master-smart";
import {JsonPipe} from "@angular/common";
import {NzTabComponent, NzTabDirective, NzTabSetComponent} from "ng-zorro-antd/tabs";

@Component({
    selector: 'app-server-detail',
    templateUrl: './server-detail.component.html',
    standalone: true,
    imports: [
        JsonPipe,
        NzTabSetComponent,
        NzTabComponent,
        NzTabDirective
    ],
    styleUrls: ['./server-detail.component.scss']
})
export class ServerDetailComponent implements OnInit {
  id: string = ""
  data: any = {}

  constructor(private route: ActivatedRoute, private rs: RequestService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = this.route.snapshot.paramMap.get("id")

    this.load()
  }

  load(){
    this.rs.get(`server/${this.id}`).subscribe(res=>{
      this.data = res.data;
    })
  }


}
