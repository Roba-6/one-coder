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
from one_coder_api.models import Category


class PostBase(SQLModel):
    title: Optional[str] = Field(
        default=None,
        max_length=opa_cst.MAX_LENGTH_255,
        description=_("The title of the post."),
    )
    overview: Optional[str] = Field(
        default=None,
        nullable=True,
        description=_("The overview of the post."),
    )
    content: Optional[str] = Field(
        default=None,
        nullable=True,
        description=_("The content of the post."),
    )
    category_id: Optional[UUID] = Field(
        default=None,
        nullable=True,
        foreign_key=constants.DB_PREFIX_OCA + "categories.id",
        ondelete="RESTRICT",
        description=_("Assigned Category ID."),
    )


class Post(PostBase, TimestampMixin, MaintenanceMixin, IdMixin, table=True):
    __tablename__ = constants.DB_PREFIX_OCA + "posts"

    title: str = Field(
        nullable=False,
        max_length=opa_cst.MAX_LENGTH_255,
        description=_("The title of the post."),
    )

    category: Optional[Category] = Relationship(
        sa_relationship_kwargs={
            "foreign_keys": "[Post.category_id]",
            "primaryjoin": "Post.category_id==Category.id",
            "remote_side": "[Category.id]",
        }
    )
    creator: Optional["User"] = Relationship(
        sa_relationship_kwargs={
            "foreign_keys": "[Post.created_by]",
            "primaryjoin": "Post.created_by==User.id",
            "remote_side": "[User.id]",
        }
    )
    updater: Optional["User"] = Relationship(
        sa_relationship_kwargs={
            "foreign_keys": "[Post.updated_by]",
            "primaryjoin": "Post.updated_by==User.id",
            "remote_side": "[User.id]",
        }
    )
