from typing import Any, Dict

from one_public_api.common.utility.str import to_camel
from one_public_api.models.mixins.id_mixin import IdMixin
from one_public_api.schemas.response_schema import example_id

from one_coder_api.models.category_model import CategoryBase

example_base: Dict[str, Any] = {
    "name": "プログラミング",
    "alias": "programming",
    "description": "Topics related to coding, software development, "
    "and programming tools.",
}

# ----- Public Schemas -----------------------------------------------------------------


class CategoryPublicResponse(CategoryBase, IdMixin):
    model_config = {
        "alias_generator": to_camel,
        "json_schema_extra": {
            "examples": [{**example_base, **example_id}],
        },
    }
