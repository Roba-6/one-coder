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
from one_coder_api.models import Category
from one_coder_api.schemas.category_schema import (
    CategoryCreateRequest,
    CategoryPublicResponse,
    CategoryResponse,
    CategoryUpdateRequest,
)
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
    name="OCA-CTG-P-LST",
    summary=_("List Public Categories"),
    response_model=ResponseSchema[CategoryPublicResponse],
)
def list_api(
    csts: Annotated[CategoryService, Depends()],
    query: Annotated[QueryParam, Query()],
) -> ResponseSchema[CategoryPublicResponse]:
    return create_response_data(
        CategoryPublicResponse, csts.get_all(query), csts.count, csts.detail
    )


# ----- Admin APIs ---------------------------------------------------------------------


@admin_router.get(
    opa_cst.ROUTER_COMMON_ADMIN,
    name="SYS-CTG-A-LST",
    summary=_("List Categories"),
    response_model=ResponseSchema[CategoryResponse],
)
def list_admin_api(
    csts: Annotated[CategoryService, Depends()],
    query: Annotated[QueryParam, Query()],
) -> ResponseSchema[CategoryResponse]:
    return create_response_data(
        CategoryResponse, csts.get_all(query), csts.count, csts.detail
    )


@admin_router.post(
    opa_cst.ROUTER_COMMON_ADMIN,
    name="SYS-CTG-A-ADD",
    summary=_("Create Category"),
    response_model=ResponseSchema[CategoryResponse],
)
def create_admin_api(
    current_user: Annotated[User, Depends(get_current_user)],
    csts: Annotated[CategoryService, Depends()],
    data: CategoryCreateRequest,
) -> ResponseSchema[CategoryResponse]:
    return create_response_data(
        CategoryResponse,
        csts.add_one_with_user(Category(**data.model_dump()), current_user),
        detail=csts.detail,
    )


@admin_router.get(
    opa_cst.ROUTER_COMMON_ADMIN_WITH_ID,
    name="SYS-CTG-A-DTL",
    summary=_("Get Category"),
    response_model=ResponseSchema[CategoryResponse],
)
def retrieve_admin_api(
    csts: Annotated[CategoryService, Depends()],
    target_id: UUID = Path(
        description=_("The ID of the Category item to be retrieved")
    ),
) -> ResponseSchema[CategoryResponse]:
    return create_response_data(
        CategoryResponse, csts.get_one_by_id(target_id), detail=csts.detail
    )


@admin_router.put(
    opa_cst.ROUTER_COMMON_ADMIN_WITH_ID,
    name="SYS-CST-A-UPD",
    summary=_("Update Category"),
    response_model=ResponseSchema[CategoryResponse],
)
def update_admin_api(
    current_user: Annotated[User, Depends(get_current_user)],
    csts: Annotated[CategoryService, Depends()],
    data: CategoryUpdateRequest,
    target_id: UUID = Path(description=_("The ID of the category item to be updated")),
) -> ResponseSchema[CategoryResponse]:
    return create_response_data(
        CategoryResponse,
        csts.update_one_by_id_with_user(
            target_id, Category(**data.model_dump()), current_user
        ),
        detail=csts.detail,
    )


@admin_router.delete(
    opa_cst.ROUTER_COMMON_ADMIN_WITH_ID,
    name="SYS-CST-A-DEL",
    summary=_("Delete Category"),
    response_model=ResponseSchema[CategoryResponse],
)
def destroy_admin_api(
    csts: Annotated[CategoryService, Depends()],
    target_id: UUID = Path(description=_("The ID of the category item to be deleted")),
) -> ResponseSchema[CategoryResponse]:
    return create_response_data(
        CategoryResponse, csts.delete_one_by_id2(target_id), detail=csts.detail
    )
