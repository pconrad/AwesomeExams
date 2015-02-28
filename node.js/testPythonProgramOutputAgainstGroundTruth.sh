#!/bin/bash

for i in {1..100000} ; do
  echo testcase $i
  diff <(./generatePythonProgramOutput -q $i | python) \
       <(./generatePythonProgramOutput -a $i)
done
