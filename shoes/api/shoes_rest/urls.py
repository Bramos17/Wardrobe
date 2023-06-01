from django.urls import path
from .views import api_shoe_list, api_show_shoe


urlpatterns = [
    path("shoes/", api_shoe_list, name="api_shoe_list"),
    path("shoes/<int:id>/", api_show_shoe, name="api_show_shoe"),
]
