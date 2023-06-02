from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import BinVO, Shoe


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        'closet_name',
        'bin_number',
        'bin_size'
        'import_href'
        ]


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        'name',
        'brand',
        'color',
        'size',
        'details',
        'reviews',
        'catagory',
        'picture_url',
        'id'
        ]
    encoders = {
        'bin': BinVOEncoder()
    }


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        'name',
        'brand',
        'color',
        'size',
        'details',
        'reviews',
        'catagory',
        'picture_url',
        'bin'
        ]
    encoders = {
        'bin': BinVOEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_shoe_list(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            href = f'/api/bins/{content["bin"]}/'
            bin = BinVO.objects.get(import_href=href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_shoe(request, id):
    if request.method == "GET":
        shoes = Shoe.objects.get(id=id)
        return JsonResponse(
            shoes,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    else:
        count = Shoe.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
