class ResponseObject {
    constructor(message, data) {
        if (arguments.length == 1) {
            this.message = message;
            this.data = null;
        } else {
            this.message = message;
            this.data = data;
        }
    }
}

module.exports = ResponseObject;