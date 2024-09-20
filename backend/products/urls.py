from django.urls import path, include
from rest_framework import routers
from .views import ProductView
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register("products", ProductView, "products")


urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("docs/", include_docs_urls(title="Products API")),
]
