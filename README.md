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
| Site1     | SearchPage    | Site1        | All          |             | Search | ART, QS | ART_Site1, QS_Site1 |
| Site1     | SearchPage    | Site1        | Youtube      |             | Search | ART, QS | ART_Site1, QS_Site1 |
| Site1     | SearchPage    | Site1        | Website      |             | Search | ART, QS | ART_Site1, QS_Site1 |
| | | | | | | |
| Site1     | LandingPage   | Listings     | Site1YoutubeList        |             | Listing | ART | ART_Listing |
| Site1     | LandingPage   | Listings     | Site1WebsiteList        |             | Listing | ART | ART_Listing |
| | | | | | | |
| Site1     | NormalPage, Youtube, PageView   | Site1     |         | Youtube            | - | - | - |
| Site1     | NormalPage, Website, PageView   | Site1     |         | Website            | - | - | - |
| | | | | | | |
| Site1     | NormalPage, Youtube, Recommendation   | Site1     |         | Youtube            | Recommendation_Youtube | Event Recommendation | Rec_Youtube_Site1 |
| Site1     | NormalPage, Website, Recommendation   | Site1     |         | Website            | Recommendation_Website | Event Recommendation | Rec_Website_Site1 |


| Site      | Page          | OriginLevel1 | OriginLevel2 | ContentType | QPL | ML Models needed | ML Models QPL |
| --------- |:------------- | ------------:| ------------:| -----------:| --- | -------- | -------- |
| Site2     | SearchPage    | Site2        | All          |             | Search | ART, QS | ART_Site2, QS_Site2 |
| Site2     | SearchPage    | Site2        | Help      |             | Search | ART, QS | ART_Site2, QS_Site2 |
| Site2     | SearchPage    | Site2        | Website      |             | Search | ART, QS | ART_Site2, QS_Site2 |
| | | | | | | |
| Site2     | LandingPage   | Listings     | Site2HelpList        |             | Listing | ART | ART_Listing |
| Site2     | LandingPage   | Listings     | Site2WebsiteList        |             | Listing | ART | ART_Listing |
| | | | | | | |
| Site2     | NormalPage, Help, PageView   | Site2     |         | Help            | - | - | - |
| Site2     | NormalPage, Website, PageView   | Site2     |         | Website            | - | - | - |
| | | | | | | |
| Site2     | NormalPage, Help, Recommendation   | Site2     |         | Help            | Recommendation_Help | Event Recommendation | Rec_Help_Site2 |
| Site2     | NormalPage, Website, Recommendation   | Site2     |         | Website            | Recommendation_Website | Event Recommendation | Rec_Website_Site2 |



**Summary**

The following ML models must be created:
* ART_Site1 with filter OriginLevel1 = Site1, ART
* QS_Site1 with filter OriginLevel1 = Site1, QS

* ART_Site2 with filter OriginLevel1 = Site2, ART
* QS_Site2 with filter OriginLevel1 = Site2, QS

* Rec_Youtube_Site1, Event Recommendation with Content Type *Youtube* and filter OriginLevel1 = Site1
* Rec_Website_Site1, Event Recommendation with Content Type *Website* and filter OriginLevel1 = Site1
* Rec_Website_Site2, Event Recommendation with Content Type *Website* and filter OriginLevel1 = Site2
* Rec_Help_Site2, Event Recommendation with Content Type *Help* and filter OriginLevel1 = Site2

The following Query Pipelines must be created:
* Search
  * Linked ML Models:
    * ART_Site1 with Condition *SearchHub = Site1*
    * QS_Site1 with Condition *SearchHub = Site1*
    * ART_Site2 with Condition *SearchHub = Site2*
    * QS_Site2 with Condition *SearchHub = Site2*
* Listing
  * Linked ML Models:
    * ART_Listing
* Recommendation_Youtube
  * Linked ML Models:
    * Rec_Youtube_Site1
* Recommendation_Website
  * Linked ML Models:
    * Rec_Website_Site1 with Condition *SearchHub = Site1*
    * Rec_Website_Site2 with Condition *SearchHub = Site2*
* Recommendation_Help
  * Linked ML Models:
    * Rec_Help_Site2

**Result**
QS:
* In Site1:
  * Possible QS: cloud, louis, coveo, salesforce, sitecore, site, commerce
  * All: site, commerce, louis, salesforce: **VALIDATED OK**
  * Youtube: nothing **VALIDATED OK**
    (Due to an error in the script, but the filtering works)
  * Website: site, sitecore cloud, commerce: **VALIDATED OK**
* In Site2:
  * Possible QS: ces, visiteurs, intelligent, ML, machine learning, ultimate, guide, laurent
  * All: ces, visiteurs, intelligent, ML, machine learning, ultimate, guide, laurent: **VALIDATED OK**
  * Help: ml, machine learning: **VALIDATED OK**
  * Website: laurent, visiteurs, utlimate, machine learning: **VALIDATED OK**
ART:
* In Site1:
  * All: 
    * site, first: The ultimate guide to site search (ART), different rank than Website **VALIDATED OK**
    * ces, first: Granting the Coveo Platform cloud access (NOT ART) **VALIDATED OK**
  * Youtube: site, first: NOT ART 
  * Website: 
    * site, first: The ultimate guide to site seach (ART) **VALIDATED OK**
    * ces, first: Politque the confidentiely (NOT ART) **VALIDATED OK**
* In Site2:
  * All: 
    * ces, first: Politque the confidentiely  (ART) **VALIDATED OK**
    * commerce, first: Commerce (NOT ART) **VALIDATED OK**
  * Help: 
    * ml, first: How long do... (ART) **VALIDATED OK**
    * coveo, first: Coveo cloud blue (NOT ART) **VALIDATED OK**
  * Website: 
    * guide, first: guide to mastering (ART) **VALIDATED OK**
    * cloud, first: platform/cloud (NOT ART) **VALIDATED OK**
  
Recommendations:
* In Site1: No results from Site2, Help should be presented
* In Site2: No results from Site1, Youtube should be presented

### Alternative Technical details
When OriginLevel1 cannot be set, you can create a custom metadata field on the Analytics calls.
In order to do so: first create a new Analytics Dimension called `mysite`.

Remark: OriginLevel1 (SearchHub), OriginLevel2 (Tab), QPL (Query Pipeline)

| Site      | Page          | customData | OriginLevel1 | OriginLevel2 | ContentType | QPL | ML Models needed | ML Models QPL |
| --------- |:------------- | ------------:|------------:| ------------:| -----------:| --- | -------- | -------- |
| Site1     | SearchPage    | mySite=Site1 | Site1        | All          |             | Search | ART, QS | ART_Site1, QS_Site1 |
| Site1     | SearchPage    | mySite=Site1 | Site1        | Youtube      |             | Search | ART, QS | ART_Site1, QS_Site1 |
| Site1     | SearchPage    | mySite=Site1 | Site1        | Website      |             | Search | ART, QS | ART_Site1, QS_Site1 |
| | | | | | | | |
| Site1     | LandingPage   | mySite=Site1 | Listings     | Site1YoutubeList        |             | Listing | ART | ART_Listing |
| Site1     | LandingPage   | mySite=Site1 | Listings     | Site1WebsiteList        |             | Listing | ART | ART_Listing |
| | | | | | | | |
| Site1     | NormalPage, Youtube, PageView   | mySite=Site1 | Site1     |         | Youtube            | - | - | - |
| Site1     | NormalPage, Website, PageView   | mySite=Site1 | Site1     |         | Website            | - | - | - |
| | | | | | | | |
| Site1     | NormalPage, Youtube, Recommendation   | mySite=Site1 | Site1     |         | Youtube            | Recommendation_Youtube | Event Recommendation | Rec_Youtube_Site1 |
| Site1     | NormalPage, Website, Recommendation   | mySite=Site1 | Site1     |         | Website            | Recommendation_Website | Event Recommendation | Rec_Website_Site1 |


| Site      | Page          |  customData | OriginLevel1 | OriginLevel2 | ContentType | QPL | ML Models needed | ML Models QPL |
| --------- |:------------- | ------------:|------------:| ------------:| -----------:| --- | -------- | -------- |
| Site2     | SearchPage    | mySite=Site2 | Site2        | All          |             | Search | ART, QS | ART_Site2, QS_Site2 |
| Site2     | SearchPage    | mySite=Site2 | Site2        | Help      |             | Search | ART, QS | ART_Site2, QS_Site2 |
| Site2     | SearchPage    | mySite=Site2 | Site2        | Website      |             | Search | ART, QS | ART_Site2, QS_Site2 |
| | | | | | | | |
| Site2     | LandingPage   | mySite=Site2 | Listings     | Site2HelpList        |             | Listing | ART | ART_Listing |
| Site2     | LandingPage   | mySite=Site2 | Listings     | Site2WebsiteList        |             | Listing | ART | ART_Listing |
| | | | | | | | |
| Site2     | NormalPage, Help, PageView   | mySite=Site2 | Site2     |         | Help            | - | - | - |
| Site2     | NormalPage, Website, PageView   | mySite=Site2 | Site2     |         | Website            | - | - | - |
| | | | | | | | |
| Site2     | NormalPage, Help, Recommendation   | mySite=Site2 | Site2     |         | Help            | Recommendation_Help | Event Recommendation | Rec_Help_Site2 |
| Site2     | NormalPage, Website, Recommendation   | mySite=Site2 | Site2     |         | Website            | Recommendation_Website | Event Recommendation | Rec_Website_Site2 |

**Additional scripts are needed**
*Page View Analytics* component from Sitecore:
Add `Coveo Usage Analytics custom metadata`:
`mysite`:`SiteName`

*Every Search page* should add this code:
```javascript
var root = document.body;
Coveo.$$(root).on('changeAnalyticsCustomData', function(e, args) {
    args.metaObject['mysite'] = SiteName;
})
```

**Summary**

The following ML models must be created:
* ART_Site1 with filter OriginLevel1 = Site1, ART
* QS_Site1 with filter OriginLevel1 = Site1, QS

* ART_Site2 with filter OriginLevel1 = Site2, ART
* QS_Site2 with filter OriginLevel1 = Site2, QS

* Rec_Youtube_Site1, Event Recommendation with Content Type *Youtube* and event filter c_mysite = Site1
* Rec_Website_Site1, Event Recommendation with Content Type *Website* and event filter c_mysite = Site1
* Rec_Website_Site2, Event Recommendation with Content Type *Website* and event filter c_mysite = Site2
* Rec_Help_Site2, Event Recommendation with Content Type *Help* and event filter c_mysite = Site2

**filter should be created like: `"viewEventFilter": "(c_mysite=~'SITENAME')"`**

The following Query Pipelines must be created:
* Search
  * Linked ML Models:
    * ART_Site1 with Condition *SearchHub = Site1*
    * QS_Site1 with Condition *SearchHub = Site1*
    * ART_Site2 with Condition *SearchHub = Site2*
    * QS_Site2 with Condition *SearchHub = Site2*
* Listing
  * Linked ML Models:
    * ART_Listing
* Recommendation_Youtube
  * Linked ML Models:
    * Rec_Youtube_Site1
* Recommendation_Website
  * Linked ML Models:
    * Rec_Website_Site1 with Condition *SearchHub = Site1*
    * Rec_Website_Site2 with Condition *SearchHub = Site2*
* Recommendation_Help
  * Linked ML Models:
    * Rec_Help_Site2
