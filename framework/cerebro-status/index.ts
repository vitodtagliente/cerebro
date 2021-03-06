enum StatusCode
{
    Continue = 100,
    SwitchingProtocols = 101,
    EarlyHints = 103,
    OK = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    URITooLong = 414,
    UnsupportedMediaType = 415,
    RangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    ImATeaPot = 418,
    UnprocessableEntity = 422,
    TooEarly = 425,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequests = 429,
    RequestHeaderFieldsTooLarge = 431,
    UnavailableForLegalReasons = 451,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HTTPVersionNotSupported = 505,
    VariantAlsoNegotiates = 506,
    InsufficientStorage = 507,
    LoopDetected = 508,
    NotExtended = 510,
    NetworkAuthenticationRequired = 511
}

function statusCodeToText(code: StatusCode) : string
{
    switch (code)
    {
        case StatusCode.Continue: return 'Continue';
        case StatusCode.SwitchingProtocols: return 'Switching Protocols';
        case StatusCode.EarlyHints: return 'Early Hints';
        case StatusCode.OK: return 'OK';
        case StatusCode.Created: return 'Created';
        case StatusCode.Accepted: return 'Accepted';
        case StatusCode.NonAuthoritativeInformation: return 'Non-Authoritative Information';
        case StatusCode.NoContent: return 'No Content';
        case StatusCode.ResetContent: return 'Reset Content';
        case StatusCode.PartialContent: return 'Partial Content';
        case StatusCode.MultipleChoices: return 'Multiple Choices';
        case StatusCode.MovedPermanently: return 'Moved Permanently';
        case StatusCode.Found: return 'Found';
        case StatusCode.SeeOther: return 'See Other';
        case StatusCode.NotModified: return 'Not Modified';
        case StatusCode.TemporaryRedirect: return 'Temporary Redirect';
        case StatusCode.PermanentRedirect: return 'Permanent Redirect';
        case StatusCode.BadRequest: return 'Bad Request';
        case StatusCode.Unauthorized: return 'Unauthorized';
        case StatusCode.PaymentRequired: return 'Payment Required';
        case StatusCode.Forbidden: return 'Forbidden';
        case StatusCode.NotFound: return 'Not Found';
        case StatusCode.MethodNotAllowed: return 'Method Not Allowed';
        case StatusCode.NotAcceptable: return 'Not Acceptable';
        case StatusCode.ProxyAuthenticationRequired: return 'Proxy Authentication Required';
        case StatusCode.RequestTimeout: return 'Request Timeout';
        case StatusCode.Conflict: return 'Conflict';
        case StatusCode.Gone: return 'Gone';
        case StatusCode.LengthRequired: return 'Length Required';
        case StatusCode.PreconditionFailed: return 'Precondition Failed';
        case StatusCode.PayloadTooLarge: return 'Payload Too Large';
        case StatusCode.URITooLong: return 'URI Too Long';
        case StatusCode.UnsupportedMediaType: return 'Unsupported Media Type';
        case StatusCode.RangeNotSatisfiable: return 'Range Not Satisfiable';
        case StatusCode.ExpectationFailed: return 'Expectation Failed';
        case StatusCode.ImATeaPot: return "I'm a tea pot";
        case StatusCode.UnprocessableEntity: return 'Unprocessable Entity';
        case StatusCode.TooEarly: return 'Too Early';
        case StatusCode.UpgradeRequired: return 'Upgrade Required';
        case StatusCode.PreconditionRequired: return 'Precondition Required';
        case StatusCode.TooManyRequests: return 'Too Many Requests';
        case StatusCode.RequestHeaderFieldsTooLarge: return 'Request Header Fields Too Large';
        case StatusCode.UnavailableForLegalReasons: return 'Unavailable For Legal Reasons';
        case StatusCode.InternalServerError: return 'Internal Server Error';
        case StatusCode.NotImplemented: return 'Not Implemented';
        case StatusCode.BadGateway: return 'Bad Gateway';
        case StatusCode.ServiceUnavailable: return 'Service Unavailable';
        case StatusCode.GatewayTimeout: return 'Gateway Timeout';
        case StatusCode.HTTPVersionNotSupported: return 'HTTP Version Not Supported';
        case StatusCode.VariantAlsoNegotiates: return 'Variant Also Negotiates';
        case StatusCode.InsufficientStorage: return 'Insufficient Storage';
        case StatusCode.LoopDetected: return 'Loop Detected';
        case StatusCode.NotExtended: return 'Not Extended';
        case StatusCode.NetworkAuthenticationRequired: return 'Network Authentication Required';
        default: return `Invalid Status Code ${code}`;
    }
}

export
{
    StatusCode,
    statusCodeToText
}

export default StatusCode;