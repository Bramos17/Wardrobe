# Wardrobify

Team:

* Brandon Ramos - Shoes
* Sophia Tony-Egbuniwe - Hats

## Design

The design will be completed using Bootstrap!

## Shoes microservice

In developing the microservice architecture, my primary approach is to utilize the knowledge and skills I've acquired over the last few months to develop comprehensive models that will be seamlessly integrated with the Wardrobe Microservice. This will allow each service to have its own database and avoid any single point of failure in the system.🤞🏾 These models will provide capabilities for creating, deleting, and retrieving lists of shoes, as well as categorizing them efficiently.💪🏾 My newly acquired knowledge in front-end coding will be leveraged to design interactive forms for user engagement.✅ Key forms include 'Shoe List' and 'New Shoe Form,' among others.

These interactive forms will provide users with a platform to view their customized shoe collections within their wardrobe and explore other users' collections. This approach aims to enhance user experience and encourage active participation within our Wardrobe platform.

For the implementation of the poller, my strategy involves creating an efficient and robust system that will periodically fetch data from the microservices. Poller will be designed to react to changes in the microservices, ensuring that the system is consistently updated.
By combining my skills and knowledge in these areas, the result will be a scalable, reliable, and efficient system that optimally serves the needs of our users.

## Hats microservice

The Hats microservice will have a Hat Model that has fields for fabric (models.CharField), style_name (models.CharField), color (models.CharField), a picture (models.UrlField), and a location foreignKey (models.ForeignKey) that points to a Location Value Object. The LocationVO will hold an import_href field that will hold the data polled from the original Location Model from the wardrobe api.

The poller will receieve data from the local server to get the data from the Location Model. It will loop over the decoded JSON and parse the necessary data that I want (href and closet_name). That dedcoded data will be used to update_or_create the LocationVO model so that it is linked to the Location Model by href.

React will then be implemented to create a component for a HatList that will show all the details pertaining to a hat and a HatForm component that will be used to create a new hat from the necessary model fields.
