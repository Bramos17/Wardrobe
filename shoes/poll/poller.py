import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

from shoes_rest.models import BinVO


def get_Bin():
    response = requests.get("http://127.0.0.1:8000/api/bin/")
    content = json.loads(response.content)
    for bin in content['bins']:
        BinVO.objects.create(
            import_href=bin['href'],
            defaults={
                'closet_name': bin['closet_name'],
                'bin_number': bin['bin_number'],
                'bin_size': bin['bin_size']
            },
        )


def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            # Write your polling logic, here
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
