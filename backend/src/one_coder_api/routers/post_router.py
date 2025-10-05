from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Path
from fastapi.params import Depends, Query
from one_public_api.common import constants as opa_cst
from one_public_api.common.query_param import QueryParam
from one_public_api.common.tools import create_response_data
from one_public_api.core import translate as _
from one_public_api.models.system.user_model import User
from one_public_api.routers.base_route import BaseRoute
from one_public_api.schemas.response_schema import ResponseSchema
from one_public_api.services.authenticate_service import get_current_user

from one_coder_api.common import constants
from one_coder_api.models import Post
from one_coder_api.schemas.post_schema import (
    PostCreateRequest,
    PostPublicResponse,
    PostResponse,
    PostUpdateRequest,
)
from one_coder_api.services.post_service import PostService

public_router = APIRouter(route_class=BaseRoute)
admin_router = APIRouter(
    route_class=BaseRoute, dependencies=[Depends(get_current_user)]
)
prefix = constants.ROUTER_PREFIX_POST
tags = [_("Posts")]

# ----- Public APIs --------------------------------------------------------------------


@public_router.get(
    opa_cst.ROUTER_COMMON_BLANK,
    name="OCA-PST-P-LST",
    summary=_("List Public Posts"),
    response_model=ResponseSchema[PostPublicResponse],
)
def list_api(
    ps: Annotated[PostService, Depends()],
    query: Annotated[QueryParam, Query()],
) -> ResponseSchema[PostPublicResponse]:
    return create_response_data(
        PostPublicResponse, ps.get_all(query), ps.count, ps.detail
    )


# ----- Admin APIs ---------------------------------------------------------------------


@admin_router.get(
    opa_cst.ROUTER_COMMON_ADMIN,
    name="SYS-PST-A-LST",
    summary=_("List Posts"),
    response_model=ResponseSchema[PostResponse],
)
def list_admin_api(
    ps: Annotated[PostService, Depends()],
    query: Annotated[QueryParam, Query()],
) -> ResponseSchema[PostResponse]:
    return create_response_data(PostResponse, ps.get_all(query), ps.count, ps.detail)


@admin_router.post(
    opa_cst.ROUTER_COMMON_ADMIN,
    name="SYS-PST-A-ADD",
    summary=_("Create Post"),
    response_model=ResponseSchema[PostResponse],
)
def create_admin_api(
    current_user: Annotated[User, Depends(get_current_user)],
    ps: Annotated[PostService, Depends()],
    data: PostCreateRequest,
) -> ResponseSchema[PostResponse]:
    return create_response_data(
        PostResponse,
        ps.add_one_with_user(Post(**data.model_dump()), current_user),
        detail=ps.detail,
    )


@admin_router.get(
    opa_cst.ROUTER_COMMON_ADMIN_WITH_ID,
    name="SYS-PST-A-DTL",
    summary=_("Get Post"),
    response_model=ResponseSchema[PostResponse],
)
def retrieve_admin_api(
    ps: Annotated[PostService, Depends()],
    target_id: UUID = Path(description=_("The ID of the Post item to be retrieved")),
) -> ResponseSchema[PostResponse]:
    return create_response_data(
        PostResponse, ps.get_one_by_id(target_id), detail=ps.detail
    )


@admin_router.put(
    opa_cst.ROUTER_COMMON_ADMIN_WITH_ID,
    name="SYS-COF-A-UPD",
    summary=_("Update Post"),
    response_model=ResponseSchema[PostResponse],
)
def update_admin_api(
    current_user: Annotated[User, Depends(get_current_user)],
    ps: Annotated[PostService, Depends()],
    data: PostUpdateRequest,
    target_id: UUID = Path(description=_("The ID of the post item to be updated")),
) -> ResponseSchema[PostResponse]:
    return create_response_data(
        PostResponse,
        ps.update_one_by_id_with_user(
            target_id, Post(**data.model_dump()), current_user
        ),
        detail=ps.detail,
    )


@admin_router.delete(
    opa_cst.ROUTER_COMMON_ADMIN_WITH_ID,
    name="SYS-COF-A-DEL",
    summary=_("Delete Post"),
    response_model=ResponseSchema[PostResponse],
)
def destroy_admin_api(
    ps: Annotated[PostService, Depends()],
    target_id: UUID = Path(description=_("The ID of the post item to be deleted")),
) -> ResponseSchema[PostResponse]:
    return create_response_data(
        PostResponse, ps.delete_one_by_id(target_id), detail=ps.detail
    )
