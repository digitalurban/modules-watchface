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
        "defaultValue": "Quadrant Module Layout"
      },
      {
        "type": "text",
        "defaultValue": "Drag modules to different quadrants. Each module can only appear once."
      },
      {
        "type": "select",
        "messageKey": "Quadrant1Module",
        "label": "Top Left Quadrant (Q1)",
        "defaultValue": "1",
        "options": [
          { "label": "Empty", "value": "0" },
          { "label": "Date", "value": "1" },
          { "label": "Weather", "value": "2" },
          { "label": "Time", "value": "3" },
          { "label": "Stats (Battery + Steps)", "value": "4" }
        ]
      },
      {
        "type": "select",
        "messageKey": "Quadrant2Module",
        "label": "Top Right Quadrant (Q2)",
        "defaultValue": "2",
        "options": [
          { "label": "Empty", "value": "0" },
          { "label": "Date", "value": "1" },
          { "label": "Weather", "value": "2" },
          { "label": "Time", "value": "3" },
          { "label": "Stats (Battery + Steps)", "value": "4" }
        ]
      },
      {
        "type": "select",
        "messageKey": "Quadrant3Module",
        "label": "Bottom Left Quadrant (Q3)",
        "defaultValue": "3",
        "options": [
          { "label": "Empty", "value": "0" },
          { "label": "Date", "value": "1" },
          { "label": "Weather", "value": "2" },
          { "label": "Time", "value": "3" },
          { "label": "Stats (Battery + Steps)", "value": "4" }
        ]
      },
      {
        "type": "select",
        "messageKey": "Quadrant4Module",
        "label": "Bottom Right Quadrant (Q4)",
        "defaultValue": "4",
        "options": [
          { "label": "Empty", "value": "0" },
          { "label": "Date", "value": "1" },
          { "label": "Weather", "value": "2" },
          { "label": "Time", "value": "3" },
          { "label": "Stats (Battery + Steps)", "value": "4" }
        ]
      }
    ]
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "Quadrant Background Colors"
      },
      {
        "type": "text",
        "defaultValue": "Enable light gray background for each quadrant (off = white)."
      },
      {
        "type": "toggle",
        "messageKey": "Quadrant1Background",
        "label": "Q1 - Top Left Background",
        "description": "Enable light gray background",
        "defaultValue": false
      },
      {
        "type": "toggle",
        "messageKey": "Quadrant2Background",
        "label": "Q2 - Top Right Background",
        "description": "Enable light gray background",
        "defaultValue": true
      },
      {
        "type": "toggle",
        "messageKey": "Quadrant3Background",
        "label": "Q3 - Bottom Left Background",
        "description": "Enable light gray background",
        "defaultValue": true
      },
      {
        "type": "toggle",
        "messageKey": "Quadrant4Background",
        "label": "Q4 - Bottom Right Background",
        "description": "Enable light gray background",
        "defaultValue": false
      }
    ]
  },
  {
    "type": "submit",
    "defaultValue": "Save Settings"
  }
];
