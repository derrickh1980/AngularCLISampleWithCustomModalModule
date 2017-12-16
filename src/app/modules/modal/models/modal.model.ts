export class ModalModel {
    constructor() {
        this.Data = null;
        this.Header = '';
        this.IsClosable = false;
        this.Message = '';
    };

    Data: any;
    Header: string;
    IsClosable: boolean;
    Message: string;
}