import copy
from gettext import GNUTranslations
from typing import Annotated, List
from uuid import UUID

from fastapi.params import Depends
from one_public_api.core import get_session
from one_public_api.core.exceptions import DataError
from one_public_api.core.i18n import get_translator
from one_public_api.services.base_service import BaseService
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session

from one_coder_api.models import Category
from one_coder_api.schemas.category_schema import CategoryResponse


class CategoryService(BaseService[Category]):
    search_columns: List[str] = ["name", "alias"]
    model = Category

    def __init__(
        self,
        session: Annotated[Session, Depends(get_session)],
        translator: Annotated[GNUTranslations, Depends(get_translator)],
    ):
        super().__init__(session, translator)

    def delete_one_by_id2(self, target_id: UUID) -> CategoryResponse:
        try:
            data: Category = self.get_one_by_id(target_id)
            result: CategoryResponse = copy.deepcopy(
                CategoryResponse.model_validate(data)
            )
            self.dd.one(data)

            self.session.commit()

            return result
        except IntegrityError:
            raise DataError(
                self._("This record might be referenced by other data."),
                code="E40900002",
            )
