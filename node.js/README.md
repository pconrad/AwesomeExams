This directory contains a shell script,
testscript.sh that calls two other scripts,
each written using node.js


testcase takes a seed, and produces a single
Python program.

testanswer takes a seed and produces the output
of what we think that program will produce.


The testscript.sh runs Python on the output
of testcase and does a diff with the testanswer.