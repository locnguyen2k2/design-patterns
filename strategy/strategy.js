const mobiconnection = () => {
    console.log('connecting mobifone ...')
};
const vnptconnection = () => {
    console.log('connecting vnpt ...')
};
const viettelconnection = () => {
    console.log('connecting viettel ...')
}

const connectPublisher = {
    mobifone: mobiconnection,
    vnpt: vnptconnection,
    viettel: viettelconnection,
}

class EInvoiceStrategy {
    constructor() {
    }

    publisherConnection(publisher) {
        return connectPublisher[publisher]();
    }
}

const newConnection = new EInvoiceStrategy();
newConnection.publisherConnection('vnpt')
newConnection.publisherConnection('viettel')
newConnection.publisherConnection('mobifone')