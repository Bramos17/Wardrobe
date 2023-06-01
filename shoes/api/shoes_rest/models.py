from django.db import models

class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()
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
