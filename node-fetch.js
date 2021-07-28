// From https://gist.github.com/alexanderniebuhr/12a60bde6faf44d4f519e93b1765ec99

// eslint-disable-next-line no-undef
const { fetch, Response, Request, Headers } = globalThis;

export default fetch;

export function FetchError(message, type, systemError) {
	Error.call(this, message);

	this.message = message;
	this.type = type;

	if (systemError) {
		this.code = this.errno = systemError.code;
	}

	Error.captureStackTrace(this, this.constructor);
}
FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

export { fetch, Response, Request, Headers };