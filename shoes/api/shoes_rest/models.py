from django.db import models
from django.urls import reverse


class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    import_href = models.CharField(max_length=200, unique=True, null=True)


class Shoe(models.Model):
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    size = models.CharField(max_length=100)
    details = models.TextField()
    reviews = models.TextField()
    catagory = models.CharField(max_length=100)
    picture_url = models.URLField()
    bin = models.ForeignKey(
        BinVO,
        on_delete=models.CASCADE,
        related_name='shoes',
        null=True,
    )

    def get_api_url(self):
        return reverse("api_location", kwargs={"id": self.id})

    def __str__(self):
        return f"{self.name} - {self.brand}in {self.catagory}"

    class Meta:
        ordering = [
            'name',
            'brand',
            'color',
            'size',
            'details',
            'reviews',
            'catagory',
            'picture_url'
            ]
