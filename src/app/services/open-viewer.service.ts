import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OpenViewerService {
  selectedViewer: string;
  selectedViewerSub = new Subject<string>();

  emitView(selectedViewer: string): void {
    this.selectedViewer = selectedViewer;
    this.selectedViewerSub.next(selectedViewer);
  }

  constructor() {}
}
