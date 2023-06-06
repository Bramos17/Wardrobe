from common.json import ModelEncoder
from .models import BinVO, Shoe


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        'closet_name',
        'bin_number',
        'bin_size',
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
        'bin',
        'id'
        ]

    encoders = {
        'bin': BinVOEncoder()
    }