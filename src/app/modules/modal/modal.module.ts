import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadComponent } from './components/load/load.component';
import { ModalComponent } from './modal.component';
import { ModalService } from './services/modal.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoadComponent, 
    ModalComponent
  ],
  exports: [
    LoadComponent,
    ModalComponent 
  ]
})
export class ModalModule {
        static forRoot(): ModuleWithProviders {
            return {
                ngModule: ModalModule,
                providers: [
                    ModalService
                ],
            };
    }
 }
