function MissingSessionIdException () {
    this.message = "Session Id is missing! Run login() method befor or pass sessionId as argument.";
    this.name = "MissingSessionIdException";
}

function MissingApiUrlException () {
    this.message = "API Url not specified!";
    this.name = "MissingApiUrlException";
}

function MissingApiHostException () {
    this.message = "API Host have to be specified. pass header object with 'Host' property to constructor";
    this.name = "MissingApiHostException";
}

module.exports = {
    MissingSessionIdException: MissingSessionIdException,
    MissingApiUrlException: MissingApiUrlException,
    MissingApiHostException: MissingApiHostException,
};