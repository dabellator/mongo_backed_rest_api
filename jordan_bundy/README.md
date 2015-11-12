# My Assignment

Instructions on the assignment are in the root of this repo.

I created two seperate collection: Developers and Caffeine.  A developer has the properties name, language, and caffeine.  Caffeine has the properties \_id, type and units.  

You can do a post route to add a document to either `/drip/developer` or `/drip/caffeine`.

You can see your data using a get to either `/drip/developer/:name` or `/drip/caffeine/:type`.

You can also do a delete on `/drip/developer/:name`.

For my new mongoose ability, I chose the `.populate` method.  To make it work, you have to create a caffeine document with an \_id of 1.  Then, run a blank put call to `/drip/developer/caffeine/:name`, and it will add an id reference to the caffeine property on developer.

Next, do a get call to `/drip/developer/caffeine/:name`.  Mongoose will 'populate' the caffeine property based on the supplied id and return the caffeine type property.

For my non CRUD operation, get `/drip`.  It's not all that amazing.
