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

