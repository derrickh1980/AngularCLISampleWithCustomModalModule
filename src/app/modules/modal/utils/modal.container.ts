export class ModalContainer {
    destroy: Function;
    componentIndex: number;
    closeModal(): void {
        this.destroy();
    }
}