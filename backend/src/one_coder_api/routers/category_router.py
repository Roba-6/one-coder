from typing import Annotated

from fastapi import APIRouter
from fastapi.params import Depends, Query
from one_public_api.common import constants as opa_cst
from one_public_api.common.query_param import QueryParam
from one_public_api.common.tools import create_response_data
from one_public_api.core import translate as _
from one_public_api.routers.base_route import BaseRoute
from one_public_api.schemas.response_schema import ResponseSchema
from one_public_api.services.authenticate_service import get_current_user

from one_coder_api.common import constants
from one_coder_api.schemas.category_schema import CategoryPublicResponse
from one_coder_api.services.category_service import CategoryService

public_router = APIRouter(route_class=BaseRoute)
admin_router = APIRouter(
    route_class=BaseRoute, dependencies=[Depends(get_current_user)]
)
prefix = constants.ROUTER_PREFIX_CATEGORY
tags = [_("Categories")]

# ----- Public APIs --------------------------------------------------------------------


@public_router.get(
    opa_cst.ROUTER_COMMON_BLANK,
    name="OCA-BLG-P-LST",
    summary=_("List Public Categories"),
    response_model=ResponseSchema[CategoryPublicResponse],
)
def list_api(
    cs: Annotated[CategoryService, Depends()],
    query: Annotated[QueryParam, Query()],
) -> ResponseSchema[CategoryPublicResponse]:
    return create_response_data(
        CategoryPublicResponse, cs.get_all(query), cs.count, cs.detail
    )


# ----- Admin APIs ---------------------------------------------------------------------
