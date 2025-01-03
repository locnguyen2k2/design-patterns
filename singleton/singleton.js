class EInvoiceClients {
    constructor() {
        // Make sure this class just has one instance in the runtime
        if (EInvoiceClients.hasInstance) {
            console.log('EInvoiceClients instance already exists...');
            return EInvoiceClients.hasInstance
        }

        EInvoiceClients.hasInstance = this;
        this.clients = {};
    }

    createEInvoiceClient(publisher) {
        if (!this.clients[publisher]) {
            this.clients[publisher] = `${publisher}`;
        } else {
            console.log('EInvoiceClients created with ' + this.clients[publisher]);
        }
    }

    updateEInvoiceClient(publisher, {token, link}) {
        if (!this.clients[publisher]) {
            console.error('EInvoiceClients not found');
        } else {
            this.clients[publisher] = {token, link};
        }
    }

    getEInvoiceClient(publisher) {
        if (!this.clients[publisher]) {
            console.error('EInvoiceClients not found');
        } else {
            return this.clients[publisher];
        }
    }
}

const newClient1 = new EInvoiceClients();
const newClient2 = new EInvoiceClients();

newClient1.createEInvoiceClient('mobifone')
newClient1.createEInvoiceClient('vnpt')
newClient2.updateEInvoiceClient('mobifone', {token: 'token1', link: 'mobilink'})
console.log(newClient2.clients);