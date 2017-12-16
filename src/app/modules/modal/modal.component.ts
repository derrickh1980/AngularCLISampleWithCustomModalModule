// Angular imports.
import { Component, OnInit, ViewContainerRef, ViewChild, Injector } from '@angular/core';

// App imports.
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
    @ViewChild("mymodal", { read: ViewContainerRef }) viewContainerRef: any;

    constructor(private _modalService: ModalService, private _injector: Injector) {
    };

    ngOnInit(): void {
        this._modalService.registerViewContainerRef(this.viewContainerRef);
        this._modalService.registerInjector(this._injector);
    };
}
