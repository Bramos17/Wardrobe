from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import LocationVO, Hat

# Create your views here.


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ['closet_name', 'import_href']


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ['style_name']

    def get_extra_data(self, o):
        return {'location': o.location.closet_name}


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        'fabric',
        'style_name',
        'color',
        'picture_url',
        'location',
    ]

    encoders = {
        'location': LocationVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        hats = Hat.objects.all()
        return JsonResponse(
            {'hats': hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            location_href = content['location']
            location = LocationVO.objects.get(import_href=location_href)
            content['location'] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid location id'},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["PUT", "DELETE", "GET"])
def api_show_hat(request, id):
    if request.method == "GET":
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=id).delete()
        return JsonResponse(
            {'deleted': count > 0}
        )
    else:
        content = json.loads(request.body)
        try:
            if 'location' in content:
                location = LocationVO.objects.get(id=content['location'])
                content['location'] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid location id'},
                status=400,
            )
        Hat.objects.filter(id=id).update(**content)
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
