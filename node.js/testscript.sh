#!/bin/bash

for i in {1..100000} ; do
  echo testcase $i
  diff <(./testcase $i | python) <(./testanswer $i)
done
