from typing import Any, Dict, Optional

from one_public_api.common import constants as opa_cst
from one_public_api.common.utility.str import to_camel
from one_public_api.core import translate as _
from one_public_api.models.mixins.id_mixin import IdMixin
from one_public_api.models.mixins.timestamp_mixin import TimestampMixin
from one_public_api.schemas.response_schema import example_audit, example_id
from one_public_api.schemas.user_schema import UserPublicResponse, example_user
from sqlmodel import Field

from one_coder_api.models.post_model import PostBase
from one_coder_api.schemas.category_schema import CategoryPublicResponse

example_base: Dict[str, Any] = {
    "title": "Using Python on macOS",
    "overview": "xxx.",
    "content": "abc.",
    "category_id": "56a98522-9fe6-4576-9f78-48e74a42a5e9",
}

# ----- Public Schemas -----------------------------------------------------------------


class PostPublicResponse(PostBase, IdMixin):
    category: Optional[CategoryPublicResponse] = Field(
        default=None, description=_("Category")
    )

    model_config = {
        "alias_generator": to_camel,
        "json_schema_extra": {
            "examples": [{**example_base, **example_id}],
        },
    }


# ----- Admin Schemas ------------------------------------------------------------------


class PostCreateRequest(PostBase):
    title: str = Field(
        max_length=opa_cst.MAX_LENGTH_255,
        description=_("The name of the category."),
    )

    model_config = {
        "alias_generator": to_camel,
        "populate_by_name": True,
        "json_schema_extra": {"examples": [{**example_base}]},
    }


class PostUpdateRequest(PostBase):
    model_config = {
        "alias_generator": to_camel,
        "populate_by_name": True,
        "json_schema_extra": {"examples": [{**example_base}]},
    }


class PostResponse(PostPublicResponse, TimestampMixin):
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
                    **example_audit,
                    **example_id,
                    "creator": example_user,
                    "updater": example_user,
                }
            ],
        },
    }
