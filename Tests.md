# Testing ML Models
## commonFilter
### ClickAsPageView, contentType and originLevel defined
```json
{
  "modelDisplayName": "TestWim2",
  "exportPeriod": "P7D",
  "intervalTime": 1,
  "intervalUnit": "DAY",
  "commandLineParameters": [
    "--conf",
    "coveo.drill.minEventsForModelBuilding=50",
    "--conf",
    "coveo.drill.eventConfigsTemplates.0=templates/PageViewFiltered.conf",
    "--conf",
    "coveo.drill.eventConfigsTemplates.1=templates/ClickAsPageViewFiltered.conf",
    "--conf",
    "coveo.drill.eventConfigsTemplates.2=templates/Query.conf",
    "--conf",
    "coveo.drill.PageViewFiltered.contentType.values.0=Youtube"
  ],
  "commonFilter": "(originLevel1=~'Site5')",
  "customEventFilter": "",
  "exportOffset": "PT0S",
  "searchEventFilter": "",
  "viewEventFilter": ""
}
```

** 56 recommendations **
** Results: Yes, with Site and Youtube content... WHY?? **

### NO ClickAsPageView. contentType and originLevel defined
```json
{
  "modelDisplayName": "TestWim3",
  "exportPeriod": "P7D",
  "intervalTime": 1,
  "intervalUnit": "DAY",
  "commandLineParameters": [
    "--conf",
    "coveo.drill.minEventsForModelBuilding=50",
    "--conf",
    "coveo.drill.eventConfigsTemplates.0=templates/PageViewFiltered.conf",
    "--conf",
    "coveo.drill.eventConfigsTemplates.2=templates/Query.conf",
    "--conf",
    "coveo.drill.PageViewFiltered.contentType.values.0=Youtube"
  ],
  "commonFilter": "(originLevel1=~'Site5')",
  "customEventFilter": "",
  "exportOffset": "PT0S",
  "searchEventFilter": "",
  "viewEventFilter": ""
}
```

** 43 recommendations, why??? **
** Results: Yes, with Site and Youtube content... WHY??  **

### NO ClickAsPageView. NO contentType. originLevel defined
```json
{
  "modelDisplayName": "TestWim4",
  "exportPeriod": "P7D",
  "intervalTime": 1,
  "intervalUnit": "DAY",
  "commandLineParameters": [
    "--conf",
    "coveo.drill.minEventsForModelBuilding=50"
  ],
  "commonFilter": "(originLevel1=~'Site5')",
  "customEventFilter": "",
  "exportOffset": "PT0S",
  "searchEventFilter": "",
  "viewEventFilter": ""
}
```

** 56 recommendations **
** Results: Yes **
** Results for site6: Yes exactly the same!!!! WHY????**

### NO ClickAsPageView. NO contentType. NO originLevel defined
```json
{
  "modelDisplayName": "TestWim5",
  "exportPeriod": "P7D",
  "intervalTime": 1,
  "intervalUnit": "DAY",
  "commandLineParameters": [
    "--conf",
    "coveo.drill.minEventsForModelBuilding=50"
  ],
  "commonFilter": "",
  "customEventFilter": "",
  "exportOffset": "PT0S",
  "searchEventFilter": "",
  "viewEventFilter": ""
}
```
** 130 recommendations **
** Results: Yes, different than TestWim4 **
** Results for site6: Yes, different than TestWim4 **

## viewEventFilter
### ClickAsPageView, contentType and originLevel defined
```json
{
  "modelDisplayName": "TestWim2a",
  "exportPeriod": "P7D",
  "intervalTime": 1,
  "intervalUnit": "DAY",
  "commandLineParameters": [
    "--conf",
    "coveo.drill.minEventsForModelBuilding=50",
    "--conf",
    "coveo.drill.eventConfigsTemplates.0=templates/PageViewFiltered.conf",
    "--conf",
    "coveo.drill.eventConfigsTemplates.1=templates/ClickAsPageViewFiltered.conf",
    "--conf",
    "coveo.drill.eventConfigsTemplates.2=templates/Query.conf",
    "--conf",
    "coveo.drill.PageViewFiltered.contentType.values.0=Youtube"
  ],
  "commonFilter": "",
  "customEventFilter": "",
  "exportOffset": "PT0S",
  "searchEventFilter": "",
  "viewEventFilter": "(originLevel1=~'Site5')"
}

** 113 recommendations **
** Results: Yes, with Youtube and Sitecontent why? **

### NO ClickAsPageView. contentType and originLevel defined
```json
{
  "modelDisplayName": "TestWim3a",
  "exportPeriod": "P7D",
  "intervalTime": 1,
  "intervalUnit": "DAY",
  "commandLineParameters": [
    "--conf",
    "coveo.drill.minEventsForModelBuilding=50",
    "--conf",
    "coveo.drill.eventConfigsTemplates.0=templates/PageViewFiltered.conf",
    "--conf",
    "coveo.drill.eventConfigsTemplates.2=templates/Query.conf",
    "--conf",
    "coveo.drill.PageViewFiltered.contentType.values.0=Youtube"
  ],
  "commonFilter": "",
  "customEventFilter": "",
  "exportOffset": "PT0S",
  "searchEventFilter": "",
  "viewEventFilter": "(originLevel1=~'Site5')"
}
```

** 130 recommendations, why??? **
** Results: Yes, with Youtube and Sitecontent **

### NO ClickAsPageView. NO contentType. originLevel defined
```json
{
  "modelDisplayName": "TestWim4a",
  "exportPeriod": "P7D",
  "intervalTime": 1,
  "intervalUnit": "DAY",
  "commandLineParameters": [
    "--conf",
    "coveo.drill.minEventsForModelBuilding=50"
  ],
  "commonFilter": "",
  "customEventFilter": "",
  "exportOffset": "PT0S",
  "searchEventFilter": "",
  "viewEventFilter": "(originLevel1=~'Site5')"
}
```

** 113 recommendations **
** Results: Yes **
** Results for site6: Yes exactly the same!!!! WHY????**

