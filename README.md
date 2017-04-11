# chainstay
A react native boilerplate with redux and AsyncStorage driving a login scenario.

In case you didn't know, a chainstay is a part of a bicycle frame, or in the case of this react native sample, some code that aspires to help some application developer's future framework.

![alt-text](https://raw.githubusercontent.com/ShawnBertini/chainstay/master/img/bike-frame-md-blue.png "Chainstay Logo")

As of this writing, just the basic iOS functionality is in place, but updates are coming soon.  So, please watch the project, or check back soon.

### For the impatient
You can download and run the sample with the following commands:
```
git clone https://github.com/ShawnBertini/chainstay.git
cd chainstay
npm install
react-native run-ios
## android coming soon
```

### If you want to know what you're getting...
When the application launches, it uses AsyncStorage to load previously saved user settings.  While the load is pending, a LoadingScene is shown.  Once the load is complete, based on the previous status, the user is directed to a login screen or the main application view.

You can log on with an empty username and password to start.  Once in the main view, you can manage a list of goals (tired of TODOs) and personal preferences.

The focus is on creating a super simple template for navigation, a multi-part redux state tree and proper use of AsyncStorage (which is a great demonstration of async operations in general).

Styling and cleanup are on the way, but the code is purposefully minimal and would be of help today to anyone starting off with react native.

### Libraries of Interest
This sample purposefully limits the number of included libraries.  Here are a few that seemed worth pulling along (links coming):

* **redux** - A highly popular state management framework. Specifically, Chainstay demonstrates one way to safely update the redux state tree based on asynchronous activities, like with AsyncStorage.
* **react-native-vector-icons** - simple package to access in incredible collection of icons
* **shortid** - a super simple library for generating unique ids.  AsyncStorage relies on unique "keys" for everything stored.

Automated testing will also be a part of this project, as it is just too important a part of modern development to exclude.  Obvioulsy, it is independent from the application.  So, you can choose to ignore at your own peril.  If you are interested, the test libraries include:

* **babel-root-slash-import** - A babel plugin that allows imports starting with '/'.  It's a syntax thing.
* **jest** - basic testing framework
* **deep-freeze** - forces javascript objects to be immutable, which is very handy for testing against direct redux state tree changes.
