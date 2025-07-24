from typing import Any, Callable, Coroutine

from fastapi import Request, Response
from one_public_api.core.log import logger


async def custom_handler(
    request: Request,
    handler: Callable[[Request], Coroutine[Any, Any, Response]],
) -> Response:
    logger.debug("* " * 30)
    rst = await handler(request)
    logger.debug("= " * 30)
    logger.debug(request)

    return rst
