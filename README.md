# Wardrobify

Team:

* Person 1 - Which microservice?
* Sophia Tony-Egbuniwe - Hats

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

## Hats microservice

The Hats microservice will have a Hat Model that has fields for fabric (models.CharField), style_name (models.CharField), color (models.CharField), a picture (models.UrlField), and a location foreignKey (models.ForeignKey) that points to a Location Value Object. The LocationVO will hold an import_href field that will hold the data polled from the original Location Model from the wardrobe api.
