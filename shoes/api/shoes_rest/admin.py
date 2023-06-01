from django.contrib import admin
from .models import BinVO

# Register your models here.
@admin.register(BinVO)
class BinVO(admin.ModelAdmin):
    pass
