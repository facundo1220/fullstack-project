from django.db import models


class Product(models.Model):
    CATEGORY_CHOICES = [
        ("electronics", "Electronics"),
        ("clothing", "Clothing"),
        ("home_kitchen", "Home and Kitchen"),
        ("beauty_personal", "Personal Care"),
        ("sports_outdoors", "Sports"),
        ("toys_games", "Toys and Games"),
        ("automotive", "Automotive"),
        ("books_media", "Books and Media"),
        ("health_wellness", "Health"),
        ("grocery_gourmet", "Grocery"),
    ]
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    category = models.CharField(
        max_length=40, choices=CATEGORY_CHOICES, default="otros"
    )

    def __str__(self) -> str:
        return self.name
