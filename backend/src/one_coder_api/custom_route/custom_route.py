from typing import Any, Callable, Coroutine

from fastapi import Request, Response
from one_public_api.common.tools import get_username_from_token
from one_public_api.core.database import session as opa_session
from one_public_api.core.log import logger
from one_public_api.crud.data_reader import DataReader
from one_public_api.models import User
from sqlmodel import Session


async def custom_handler(
    request: Request,
    handler: Callable[[Request], Coroutine[Any, Any, Response]],
) -> Response:
    get_current_user(request, opa_session)
    logger.debug("* " * 30)
    rst = await handler(request)
    logger.debug("= " * 30)
    logger.debug(request)

    return rst


def get_current_user(request: Request, session: Session) -> bool:
    if request.headers.get("Authorization"):
        logger.debug("()" * 30)
        logger.debug(request.headers.get("Authorization"))
        token: str = str(request.headers.get("Authorization")).split(" ")[1]
        try:
            logger.debug("TOKEN : " + token)
            username = get_username_from_token(token)
            logger.debug("USER NAME : " + str(username))
            if username:
                dr: DataReader = DataReader(session)
                user: User = dr.one(User, {"name": username})
                logger.debug("USER      : " + str(user.model_dump()))
        except Exception as e:
            logger.error(e)
            return False
        return True
    else:
        return False
