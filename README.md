# chainstay
A react native boilerplate with redux and AsyncStorage driving a login scenario.

In case you didn't know, a chainstay is a part of a bicycle frame, or in the case of this react native sample, an aspiring part of an application framework.

![alt-text](https://raw.githubusercontent.com/ShawnBertini/chainstay/master/img/bike-frame-md-blue.png "Chainstay Logo")

As of this writing, the basic iOS functionality is in place, but there are numerous cleanup items remaining.  Updates are coming soon.  Please check back.

In the meantime, here's an overview of what's in place and
a bit about what's coming:

### Basic Application Flow
When the application launches, it uses AsyncStorage to load previously saved user settings.  While the load is pending, a LoadingScene is shown.  Once the load is complete, based on the previous settings, the user is directed to a login screen or the main application view.

You can log on with an empty username and password to start.  Once in the man view, you can manage a list of goals (tired of TODOs) and personal preferences.

The focus is on creating a simple sample for navigation, a multi-part redux state tree and proper use of AsyncStorage.

Styling and cleanup are on the way, but the code is purposefully minimal and would likely be of help today to anyone starting off with react native.

### Libraries of Interest
This sample purposefully limits the number of included libraries.  Here are a few that seemed worth pulling along (links coming):

* *redux* - A highly popular state management framework. Specifically, Chainstay demonstrates one way to safely update the redux state tree based on asynchronous activities, like with AsyncStorage.
* *react-native-vector-icons* - simple package to access in incredible collection of icons
* *shortid* - a simple library for generating unique ids

Automated testing will also be a part of this project, as it is just too important a part of modern development to exclude.  Obvioulsy, it is independent from the application.  So, you can choose to ignore at your own peril.  If you are interested, the test libraries include:

* *jest* - basic testing framework
* *deep-freeze* - forces javascript objects to be immutable, which is very handy for testing against direct redux state tree changes.
