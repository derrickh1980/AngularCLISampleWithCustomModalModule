// Angular imports.
import { Component, ComponentRef, OnInit } from '@angular/core';

// RxJS imports.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

// App imports
import { LoadComponent } from './modules/modal/components/load/load.component';
import { ModalModel } from './modules/modal/models/modal.model';
import { ModalService } from './modules/modal/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadModal: Observable<ComponentRef<LoadComponent>>;
  modalModel: ModalModel = new ModalModel();
  title = 'app';

  constructor(
    private _modalService: ModalService
  ) {};

  ngOnInit() {
    let me = this;
    try {
      me.modalModel.Header = 'Load Test';
      me.modalModel.Message = 'This is a test of the modal module system.'
      me.modalModel.Data = {}; // Give you the ability to pass a data model to the modal.
      me.modalModel.IsClosable = true; // This boolean is intended to give the user the ability to close the modal without interacting with it. Like clicking outside the modal.
      me.loadModal = me._modalService.create(LoadComponent, {
        modalModelInput: me.modalModel,
        ok: () => {
          // This function is for recieving user interaction.
          // This function would be tied to the Ok button in the modal.
        },
        cancel: () => {
          // This function is for recieving user interaction.
          // This function would be tied to the Cancel button in the modal.
        },
        onDestroy: () => {
          // This funciton runs after the modal has been destroyed.
          try {
            me.loadModal = null;
            me.modalModel = new ModalModel();
          } catch(e) {
            alert(e);
          }
        }
      });

      // Simulating loading data to the application.
      setTimeout(() => {
        me.loadModal.first().subscribe(modal => {
          modal.instance.onOk();
        });  
      }, 5000);
    } catch (e) {
      alert(e);
    }
  };
}
