from rest_framework import viewsets
from .serializer import ProductSerializer
from .models import Product
from rest_framework.permissions import IsAuthenticated


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated]
