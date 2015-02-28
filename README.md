AwesomeNextSteps
================

The next steps towards Project Awesome

# Remember the submodules

* Project Awesome uses submodules (currently just purl)
 * Submodules are "repos inside repos"--essentially "symbolic links" to other repos containing libraries that this project depends on.
* So, after you clone this repo, always do this first:
 * git submodule init
 * git submodule update
* Those two commands populate the subdirectories with the submodule contents.

# The Directories

* `html` contains these html files:
 * `quiz.html` which is an html file that gets "called" from start.html, or startAdvanced.html with URL params to generate a quiz.
 * `start.html` which is a simple UI (lousy) from which a quiz can be generated
 * `startAdvanced.html` which is a slightly more advanced (but still lousy) UI from which a quiz can be generated

To actually see a quiz, start in either start.html or startAdvanced.html:
* http://www.cs.ucsb.edu/~pconrad/github/AwesomeNextSteps/html/start.html
* http://www.cs.ucsb.edu/~pconrad/github/AwesomeNextSteps/html/startAdvanced.html
