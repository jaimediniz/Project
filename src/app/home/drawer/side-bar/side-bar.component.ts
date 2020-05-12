import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnInit {
  @Output() open = new EventEmitter<number>();
  public mute = false;

  constructor() {}

  ngOnInit(): void {}
}
