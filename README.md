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

# Actually making a quiz

To actually see a quiz, start in either start.html or startAdvanced.html:
* http://www.cs.ucsb.edu/~pconrad/github/AwesomeNextSteps/html/start.html
* http://www.cs.ucsb.edu/~pconrad/github/AwesomeNextSteps/html/startAdvanced.html

The start.html is a simple UI that was never intended for anything other than programmer testing of Project Awesome modules.   Before this thing is a viable product for use by faculty or students, it needs to be replace with something more humane.

Ditto with the startAdvanced.html, which provides the ability to make a quiz from a JSON description.

# The Directories

* `html` contains html files for a very basic user interface for debugging the Project Awesome question generating modules.  
* `js` contains the JavaScript files that form the core Project Awesome functionality in its current state  
* `LICENSE` self-explanatory  
* `purl` subdirectory for the purl submodule (its own repo), a separate project that provides access to URL parameters
* `README.md` the file you are now reading    
* `test` subdirectory with HTML and js for supporting testing.
* `node.js` contains scripts for testing certain question types against ground truth. For example, for questions that generate Python code and ask "what is the output", a script in this directory generate the Python, runs it, and compares the actual result printed against Project Awesome's calculated answer.
* `schema` contains `quiz.json`, an example of a quiz built using the JSON schema format and `schema.json`, the description of the JSON schema.


# More detail on each directory

* `html` contains these html files:
 * `quiz.html` which is an html file that gets "called" from start.html, or startAdvanced.html with URL params to generate a quiz.
 * `start.html` which is a simple UI (lousy) from which a quiz can be generated
 * `startAdvanced.html` which is a slightly more advanced (but still lousy) UI from which a quiz can be generated

* `js` contains these files and directories:
 * `bits.js`
 * `interpretJSON.js`
 * `questions`
 * `questionTypes.js`
 * `quiz.js`
 * `random.js`
 * `utils.js`

