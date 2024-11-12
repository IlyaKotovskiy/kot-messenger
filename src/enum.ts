export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum HTTP_CODES {
  OK = 200,
  CREATED = 201,
  REDIRECT = 300,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum WS_TransportEvents {
  Connected = 'connected',
  Close = 'close',
  Error = 'error',
  Message = 'message'
}

export enum WS_EVENTS {
  Open = 'open',
  Message = 'message',
  Error = 'error',
  Close = 'close',
}

export enum STORE_EVENTS {
  Updated = 'updated'
}