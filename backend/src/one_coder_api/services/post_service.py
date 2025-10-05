from gettext import GNUTranslations
from typing import Annotated, List

from fastapi.params import Depends
from one_public_api.core import get_session
from one_public_api.core.i18n import get_translator
from one_public_api.services.base_service import BaseService
from sqlmodel import Session

from one_coder_api.models import Post


class PostService(BaseService[Post]):
    search_columns: List[str] = ["title", "overview", "content"]
    model = Post

    def __init__(
        self,
        session: Annotated[Session, Depends(get_session)],
        translator: Annotated[GNUTranslations, Depends(get_translator)],
    ):
        super().__init__(session, translator)
