module.exports = [
  {
    "type": "heading",
    "defaultValue": "Modules Watchface Settings"
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "Weather Settings"
      },
      {
        "type": "toggle",
        "messageKey": "TemperatureUnit",
        "label": "Use Celsius",
        "description": "Temperature in Celsius instead of Fahrenheit",
        "defaultValue": false
      },
      {
        "type": "toggle",
        "messageKey": "UseGPS",
        "label": "Auto Location (GPS)",
        "description": "Use phone's GPS for weather location",
        "defaultValue": true
      },
      {
        "type": "input",
        "messageKey": "ZipCode",
        "defaultValue": "",
        "label": "ZIP Code / City",
        "description": "Enter ZIP code or city name (used when GPS is off)",
        "attributes": {
          "placeholder": "e.g., 90210 or London"
        }
      }
    ]
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "Quadrant Modules (Future Feature)"
      },
      {
        "type": "select",
        "messageKey": "Quadrant1Module",
        "label": "Top Left Quadrant",
        "defaultValue": "date",
        "options": [
          { "label": "Date", "value": "date" },
          { "label": "Week Number", "value": "weeknum" },
          { "label": "Battery", "value": "battery" },
          { "label": "Steps", "value": "steps" }
        ]
      },
      {
        "type": "select",
        "messageKey": "Quadrant2Module",
        "label": "Top Right Quadrant",
        "defaultValue": "weather",
        "options": [
          { "label": "Weather", "value": "weather" },
          { "label": "Sunrise/Sunset", "value": "sundata" },
          { "label": "Calendar", "value": "calendar" }
        ]
      },
      {
        "type": "select",
        "messageKey": "Quadrant3Module",
        "label": "Bottom Left Quadrant",
        "defaultValue": "time",
        "options": [
          { "label": "Time (Hour:Minute)", "value": "time" },
          { "label": "Time with Seconds", "value": "timesec" },
          { "label": "Date (Full)", "value": "datefull" }
        ]
      },
      {
        "type": "select",
        "messageKey": "Quadrant4Module",
        "label": "Bottom Right Quadrant",
        "defaultValue": "stats",
        "options": [
          { "label": "Battery + Steps", "value": "stats" },
          { "label": "Battery Only", "value": "battery" },
          { "label": "Steps Only", "value": "steps" },
          { "label": "Bluetooth Status", "value": "bluetooth" }
        ]
      }
    ]
  },
  {
    "type": "submit",
    "defaultValue": "Save Settings"
  }
];
