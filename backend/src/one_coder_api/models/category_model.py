from enum import IntEnum
from typing import Optional
from uuid import UUID

from one_public_api.common import constants as opa_cst
from one_public_api.core import translate as _
from one_public_api.models.mixins.id_mixin import IdMixin
from one_public_api.models.mixins.maintenance_mixin import MaintenanceMixin
from one_public_api.models.mixins.timestamp_mixin import TimestampMixin
from one_public_api.models.system.user_model import User
from sqlmodel import Field, Relationship, SQLModel

from one_coder_api.common import constants


class CategoryType(IntEnum):
    CATEGORY = 0
    SINGLE = 1
    EXTERNAL = 2


class CategoryBase(SQLModel):
    name: Optional[str] = Field(
        default=None,
        max_length=opa_cst.MAX_LENGTH_255,
        description=_("The name of the category."),
    )
    type: Optional[CategoryType] = Field(
        default=None,
        description=_("The type of the category."),
    )
    alias: Optional[str] = Field(
        default=None,
        nullable=True,
        unique=True,
        max_length=opa_cst.MAX_LENGTH_55,
        description=_("The alias of the category."),
    )
    description: Optional[str] = Field(
        default=None,
        nullable=True,
        max_length=opa_cst.MAX_LENGTH_1000,
        description=_("Additional details or explanation about the category."),
    )
    parent_id: Optional[UUID] = Field(
        default=None,
        nullable=True,
        foreign_key=constants.DB_PREFIX_OCA + "categories.id",
        ondelete="RESTRICT",
        description=_("Parent category"),
    )


class CategoryStatus(SQLModel):
    is_enabled: Optional[bool] = Field(
        default=None,
        description=_("Whether the category is enabled"),
    )


class Category(
    CategoryBase, CategoryStatus, TimestampMixin, MaintenanceMixin, IdMixin, table=True
):
    __tablename__ = constants.DB_PREFIX_OCA + "categories"

    name: str = Field(
        nullable=False,
        max_length=opa_cst.MAX_LENGTH_255,
        description=_("The name of the category."),
    )
    type: CategoryType = Field(
        default=CategoryType.CATEGORY,
        nullable=False,
        description=_("The type of the category."),
    )
    is_enabled: bool = Field(
        default=False,
        nullable=False,
        description=_("Whether the category is enabled"),
    )

    parent: Optional["Category"] = Relationship(
        sa_relationship_kwargs={
            "foreign_keys": "[Category.parent_id]",
            "primaryjoin": "Category.parent_id==Category.id",
            "remote_side": "[Category.id]",
            "lazy": "selectin",
        }
    )
    creator: Optional["User"] = Relationship(
        sa_relationship_kwargs={
            "foreign_keys": "[Category.created_by]",
            "primaryjoin": "Category.created_by==User.id",
            "remote_side": "[User.id]",
        }
    )
    updater: Optional["User"] = Relationship(
        sa_relationship_kwargs={
            "foreign_keys": "[Category.updated_by]",
            "primaryjoin": "Category.updated_by==User.id",
            "remote_side": "[User.id]",
        }
    )
