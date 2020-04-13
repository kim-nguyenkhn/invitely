class InvalidRequestParameters(Exception):
    pass


class NotFoundError(Exception):
    pass


class UnauthorizedError(Exception):
    pass


class ForbiddenError(Exception):
    pass


class DuplicateError(Exception):
    pass


class ConflictError(Exception):
    pass


class NotFoundInPostError(Exception):
    pass
