from one_public_api.common import constants as opa_cst
from one_public_api.core import translate as _
from one_public_api.models.mixins.id_mixin import IdMixin
from sqlmodel import Field, SQLModel

from one_coder_api.common import constants


class CategoryBase(SQLModel):
    name: str = Field(
        min_length=opa_cst.MAX_LENGTH_6,
        max_length=opa_cst.MAX_LENGTH_100,
        description=_("The name of the category."),
    )
    alias: str = Field(
        max_length=opa_cst.MAX_LENGTH_55,
        description=_("The alias of the category."),
    )
    description: str | None = Field(
        default=None,
        max_length=opa_cst.MAX_LENGTH_1000,
        description=_("Additional details or explanation about the category."),
    )


class Category(CategoryBase, IdMixin, table=True):
    __tablename__ = constants.DB_PREFIX_OCA + "categories"
