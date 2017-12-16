// Angular imports
import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

// App imports.
import { ModalModel } from '../../models/modal.model';

@Component({
  selector: 'load-modal',
  templateUrl: './load.component.html',
  styleUrls: [
    '../../modal.component.css',
    './load.component.css'
    ],
    animations: [
        trigger('mymodal', [
            transition('void => *', [
                style({ transform: 'scale3d(.3, .3, .3)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
            ])
        ])
    ]
})
export class LoadComponent {
    @Input() modalModelInput: ModalModel;
    isShowing: boolean = false;
    
    cancel: Function;
    destroy: Function;
    ok: Function;
    onDestroy: Function;

    onCancel(): void {
        this.isShowing = false;
        setTimeout(() => {
            this.cancel();
            this.destroy();
            this.onDestroy();
            
        }, 500);
    };

    onOk(): void {
        this.isShowing = false;
        setTimeout(() => {
            this.ok();
            this.destroy();
            this.onDestroy();
        }, 500);
    };

    optionalClose(): void {
        if (this.modalModelInput.IsClosable) {
            this.onCancel();
        }
    };
}
