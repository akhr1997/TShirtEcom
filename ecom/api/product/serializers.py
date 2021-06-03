# from typing_extensions import Required
from django.db import models
from rest_framework import serializers

from .models import Product

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False)
    # to get full URL of Image, we use above line
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'prize', 'image', 'category')    