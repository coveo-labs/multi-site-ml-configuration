# Multi Site, ML Configuration setup example
How do you need to setup your Search page + Analytics + Recommendations in a multi site setup.
This guide will help you as a reference.

## Summary
Suppose you have the following setup:
Site1 (www.coveo.com)
Site2 (help.coveo.com)

Your requirements are as follows (all data is stored in a single Coveo Organization):
Site1:
* Search page with:
  * Search All in a specific tab
  * Search Youtube in a specific tab
  * Search Website in a specific tab
* Landing page with:
  * Listing popular Youtube videos
  * Listing popular Website pages
* Normal pages with:
  * Pageviews on Youtube videos
  * Pageviews on Website pages
  * Recommended Youtube videos
  * Recommended Website pages

Site2:
* Search page with:
  * Search All in a specific tab
  * Search Online help in a specific tab
  * Search Website in a specific tab
* Landing page with:
  * Listing popular Online help pages
  * Listing popular Website pages
* Normal pages with:
  * Pageviews on Online help pages
  * Pageviews on Website pages
  * Recommended Online help pages
  * Recommended Website pages

### Technical details
Remark: OriginLevel1 (SearchHub), OriginLevel2 (Tab), QPL (Query Pipeline)

| Site      | Page          | OriginLevel1 | OriginLevel2 | ContentType | QPL | ML Models needed | ML Models QPL |
| --------- |:------------- | ------------:| ------------:| -----------:| --- | -------- | -------- |
| Site1     | SearchPage    | Site1        | All          |             | Search | ART, QS | ART_Search, QS_Search |
| Site1     | SearchPage    | Site1        | Youtube      |             | Search | ART, QS | ART_Search, QS_Search |
| Site1     | SearchPage    | Site1        | Website      |             | Search | ART, QS | ART_Search, QS_Search |
| | | | | | | |
| Site1     | LandingPage   | Listings     | Site1YoutubeList        |             | Listing | ART, QS | ART_Search |
| Site1     | LandingPage   | Listings     | Site1WebsiteList        |             | Listing | ART, QS | ART_Search |
| | | | | | | |
| Site1     | NormalPage, Youtube, PageView   | Site1     |         | Youtube            | - | - | - |
| Site1     | NormalPage, Website, PageView   | Site1     |         | Website            | - | - | - |
| | | | | | | |
| Site1     | NormalPage, Youtube, Recommendation   | Site1     |         | Youtube            | Recommendation_Youtube | Event Recommendation | Rec_Youtube |
| Site1     | NormalPage, Website, Recommendation   | Site1     |         | Website            | Recommendation_Website | Event Recommendation | Rec_Website |

| Site      | Page          | OriginLevel1 | OriginLevel2 | ContentType | QPL | ML Models needed | ML Models QPL |
| --------- |:------------- | ------------:| ------------:| -----------:| --- | -------- | -------- |
| Site2     | SearchPage    | Site2        | All          |             | Search | ART, QS | ART_Search, QS_Search |
| Site2     | SearchPage    | Site2        | Help      |             | Search | ART, QS | ART_Search, QS_Search |
| Site2     | SearchPage    | Site2        | Website      |             | Search | ART, QS | ART_Search, QS_Search |
| | | | | | | |
| Site2     | LandingPage   | Listings     | Site2HelpList        |             | Listing | ART, QS | ART_Search |
| Site2     | LandingPage   | Listings     | Site2WebsiteList        |             | Listing | ART, QS | ART_Search |
| | | | | | | |
| Site2     | NormalPage, Help, PageView   | Site2     |         | Help            | - | - | - |
| Site2     | NormalPage, Website, PageView   | Site2     |         | Website            | - | - | - |
| | | | | | | |
| Site2     | NormalPage, Help, Recommendation   | Site2     |         | Help            | Recommendation_Help | Event Recommendation | Rec_Help |
| Site2     | NormalPage, Website, Recommendation   | Site2     |         | Website            | Recommendation_Website | Event Recommendation | Rec_Website |



**Summary**

The following ML models must be created:
* ART_Search, ART
* QS_Search, QS
* Rec_Youtube, Event Recommendation with Content Type *Youtube*
* Rec_Website, Event Recommendation with Content Type *Website*
* Rec_Help, Event Recommendation with Content Type *Help*

The following Query Pipelines must be created:
* Search
  * Linked ML Models:
    * ART_Search
    * QS_Search
* Listing
  * Linked ML Models:
    * ART_Search
* Recommendation_Youtube
  * Linked ML Models:
    * Rec_Youtube
* Recommendation_Website
  * Linked ML Models:
    * Rec_Website
* Recommendation_Help
  * Linked ML Models:
    * Rec_Help


During indexing we translate the lattitude/longitude values into geohash values.
For example: 53.1444/6.04999 translates into u1, u1k, u1kq, u1kq6, u1kq6ft, u1kq6fts geohash values.

In order to display on a Google Map the information from a large index (>9M documents) we need to perform some grouping. The grouping is done using facet values on each geohash. We have geohash2 to geohash8 facets.

Based upon the zoom level of the map the proper field is being choosen and requested (seperately from the normal query) to plot the items on the map. To get the values we call the `listFieldValues` on the SearchEndpoint.

For example: the inital map is displayed with geohash 4 values:

![Screenshot](ressources/Images/Geohash4.png)

The red squares are the area's, the more red an area is, the more houses are available.
When you search for `Amsterdam`, the map will zoom in into that area and will move to geo hash 5:

![Screenshot](ressources/Images/Geohash5.png)

Zooming in on the map will update the results and will activate geo hash 6:

![Screenshot](ressources/Images/Geohash6.png)

Geo hash 6 will also add numbers into the area's.
And clicking even further, will move to the final geo hash level 8:

![Screenshot](ressources/Images/Geohash8.png)

As you can see, some hashes contain indivdual values, which are being fetched with an additional query.
When you zoom in one more time, the geo hashes will not be displayed anymore and individual values will be retrieved:

![Screenshot](ressources/Images/NoMoreHash.png)



Visit the [live map](https://labs.coveodemo.com/geohash/index.html) to have fun with it. 

## Requirements
Node JS => 8.0

Google Map API key

Coveo Cloud Organization (with data containing lat/long fields)

## Setup

1. Fork / clone the repository.
2. `npm install` at the top of the repository.
3. Configuration of Coveo Cloud and Google API key
4. `npm run watch` at the top of the repository.
5. Open your browser and and paste in the url  

## Prepare your index
In order to get the proper content into the index add the following fields:
All of type: String, Facet enabled, Use Cache for nested queries (advanced) enabled.
- geohash2
- geohash3
- geohash4
- geohash5
- geohash6
- geohash7
- geohash8

Also add the fields to hold your lattitude/longitude data:
All of type: Decimal, Use Cache for numeric queries (advanced) enabled.
- mylat2
- mylon2

Fields to hold the demo data:
- lat, lon, adres, pc (zipcode), wpl (city), gem (state), prov (province), bouwjaar (build in year), kamers (rooms), opp (area)

## Get Your Data
For this instance we used houses from the Netherlands and we pushed them into a source. See \Resources\Data.
Important for the data is that they have the proper GeoHash codes in them. The IPE script in \Resources\Data\IPE will add them.

## Structure

The code is written in [typescript](http://www.typescriptlang.org/) and compiled using [webpack](https://webpack.github.io/)

## Build task

* `npm run setup ` will copy the needed ressources (`index.html`, `templates`, etc.) in the `bin` folder.
* `npm run css` will build the sass files into a css file in the `bin` folder.
* `npm run build` will run the `setup`, `css` task, then compile the typescript code.

## Dev

`npm run watch` will start a [webpack dev server](https://webpack.js.org/concepts/). After it finishes, load [http://localhost:3000](http://localhost:3000) in a browser, and the `index.html` page should load.

Then, anytime you hit save in a typescript file, the server will reload your application.

## Useful Visual Studio Code Extensions

If you are using Visual Studio Code, you can install the following extensions:

### [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

Shows inline linter problems in the code based on the `tslint.json` file. This will ensure that you are consistent with the formatting standards. 


