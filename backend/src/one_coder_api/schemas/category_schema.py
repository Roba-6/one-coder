from typing import Any, Dict, Optional

from one_public_api.common import constants as opa_cst
from one_public_api.common.utility.str import to_camel
from one_public_api.core import translate as _
from one_public_api.models.mixins.id_mixin import IdMixin
from one_public_api.models.mixins.timestamp_mixin import TimestampMixin
from one_public_api.schemas.response_schema import example_audit, example_id
from one_public_api.schemas.user_schema import UserPublicResponse, example_user
from sqlmodel import Field

from one_coder_api.models.category_model import (
    CategoryBase,
    CategoryStatus,
    CategoryType,
)

example_base: Dict[str, Any] = {
    "name": "Programming",
    "alias": "programming",
    "type": CategoryType.CATEGORY,
    "description": "Topics related to coding, software development, "
    "and programming tools.",
}
example_status: Dict[str, Any] = {
    "is_enabled": True,
}

# ----- Public Schemas -----------------------------------------------------------------


class CategoryPublicResponse(CategoryBase, IdMixin):
    parent: Optional["CategoryPublicResponse"] = Field(
        default=None,
        description=_("Parent category"),
    )

    model_config = {
        "alias_generator": to_camel,
        "json_schema_extra": {
            "examples": [{**example_base, **example_id}],
        },
    }


# ----- Admin Schemas ------------------------------------------------------------------


class CategoryCreateRequest(CategoryBase, CategoryStatus):
    name: str = Field(
        max_length=opa_cst.MAX_LENGTH_255,
        description=_("The name of the category."),
    )

    model_config = {
        "alias_generator": to_camel,
        "populate_by_name": True,
        "json_schema_extra": {"examples": [{**example_base, **example_status}]},
    }


class CategoryUpdateRequest(CategoryBase, CategoryStatus):
    model_config = {
        "alias_generator": to_camel,
        "populate_by_name": True,
        "json_schema_extra": {"examples": [{**example_base, **example_status}]},
    }


class CategoryResponse(CategoryPublicResponse, CategoryStatus, TimestampMixin):
    parent: Optional["CategoryResponse"] = Field(
        default=None,
        description=_("Parent category"),
    )
    creator: Optional[UserPublicResponse] = Field(
        default=None,
        description=_("Creator"),
    )
    updater: Optional[UserPublicResponse] = Field(
        default=None,
        description=_("Updater"),
    )
    model_config = {
        "alias_generator": to_camel,
        "populate_by_name": True,
        "json_schema_extra": {
            "examples": [
                {
                    **example_base,
                    **example_status,
                    **example_audit,
                    **example_id,
                    "creator": example_user,
                    "updater": example_user,
                }
            ],
        },
    }
